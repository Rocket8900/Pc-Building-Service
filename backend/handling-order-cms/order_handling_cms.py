from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from invokes import invoke_http
from datetime import datetime
import jwt
from dotenv import load_dotenv

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'SantaClause123')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# URLS
cart_url = 'http://host.docker.internal:5002/retrieve-cart'
order_url = 'http://host.docker.internal:5001/order'
notification_url = 'http://host.docker.internal:5900/send-confirmation-email'
parts_url = 'http://host.docker.internal:5950/part'
amqp_url = "http://host.docker.internal:3200/api/data"
delete_cart_url = "http://host.docker.internal:5002/delete-cart"

def decode_user(token: str):
    """
    :param token: jwt token
    :return:
    """
    decoded_data = jwt.decode(jwt=token,
                              key=SECRET_KEY,
                              algorithms=["HS256"])

    return decoded_data


# Start
@app.route("/post-payment-processing", methods=['POST'])
def postPaymentProcessing():
    try:
        # Retrieving customer_id from POST request
        auth_key_received = request.json.get('auth_key', None)

        # Checking to see if Auth key is received
        if (auth_key_received is None):
            return jsonify({"error": "Auth key is missing"}), 400

        # Decoding the Auth key
        auth_key = decode_user(auth_key_received)

        # Retrieving the customerID from Auth Key
        customer_id = auth_key['user_id']['user_id']
        orig_name = auth_key['user_id']['name']
        customer_name = orig_name.replace(' _', '')
        customer_email = auth_key['user_id']['email']

        # Get today's date
        today = datetime.today()

        # Format today's date as a string in the desired format
        formatted_date = today.strftime("%d %B %Y")

        # Retrieving Cart Data ( # 2 )
        cart_data = retrieveCustomerCart(auth_key_received)
        print("HERE", cart_data)
        cart_data["data"]["date"] = formatted_date
        
        # Send Email with Cart Data ( # 12 )
        sendConfirmationEmail(cart_data, customer_name, customer_email)

        # Save cart data to order db with date ( # 1 )
        sendCartDataToOrderDB(cart_data, auth_key)

        # Send Logging for Order Success
        sendSuccessLog(cart_data, formatted_date, customer_id)

        # Delete Cart ( #4 )
        deleteCustomerCart(auth_key_received)

        return {
            "code": 201,
            "message": "Order Success!"
        }
        
    except Exception as e:
        sendErrorLog(e, customer_id, formatted_date)
        


#1) Post cart data from Cart MS to Order MS, delete cart entry
def sendCartDataToOrderDB(cart_data, auth_key):
    payload = {
            "cart_data": cart_data['data'],
            "auth_key": auth_key
        }
    # payload = {'cart_item': cart_data['data'], "auth_key": auth_key}

    print('\n---- Sending Cart Data to Order DB ----')
    send_to_order_db = invoke_http(order_url, method='POST', json=payload)
    return send_to_order_db

#2) Retrieve cart data from Cart MS
# @app.route("/place_order/cart/<customer_id>", methods=['GET'])
def retrieveCustomerCart(auth_key):
    print('\n---- Retrieving Cart ----')
    order_result = invoke_http(cart_url, method='POST', json={"auth_key": auth_key})
    #order_result = invoke_http(cart_url + '/' + customer_id, method='GET', json={"customer_id": customer_id})

    if order_result['code'] == 404 or order_result['code'] == 500:
        print('---- Error in retrieving cart ----')
        return {
            "code": 404,
            "data": {
                "customer_id": auth_key,
                "order_result": order_result,
            },
            "message": "Error in retrieving Cart."

        }

    for item in order_result['data']['cart_item']:
        price = 0.0
        for part in item['parts']:
            partid = part['parts_id']
            result_from_parts_ms = invoke_http(parts_url, method='POST', json={"part_id": partid})
            parts_name = result_from_parts_ms['part_name']
            parts_price = result_from_parts_ms['part_price']
            parts_quantity = part['quantity']
            part['parts_name'] = parts_name
            part['parts_price'] = float(parts_price)
            part["quantity"] = int(parts_quantity)
            price += (float(parts_price) * float(parts_quantity))
        item['price'] = price
            
    print('order_result:', order_result['data'])
    return order_result

#3) Retrieve total bill of customer from cart DB
@app.route("/place_order/cart/<customer_id>/total_price", methods=['GET'])
def retrieveCustomerCartandBill(customer_id):
    print('----Invoking Cart Microservice----')
    order_result = retrieveCustomerCart(customer_id)
    total_price = 0.0
    code = order_result['code']
    for pc in order_result['data']['cart_item']:
        total_price += pc['price']
    output = {'code': code, 'total_price': total_price}
    
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Cart Microservice----')
        return {
            "code": 404,
            "data": {
                "customer_id": customer_id
            },
            "message": "Cart not found."

        }
    print('Total price:', output['total_price'])
    return output
    

#4) Delete the whole cart 
@app.route("/place_order/cart/<customer_id>/delete", methods=['DELETE'])
def deleteCustomerCart(auth_key):
    print('----Invoking Cart Microservice----')
    order_result = invoke_http(delete_cart_url, method='DELETE', json={"auth_key": auth_key})
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Cart Microservice----')
        return {
            "code": 404,
            "data": {
                "customer_id": auth_key
            },
            "message": "Failed to delete cart."
        }
    print('order_result:', order_result)
    return order_result

#5) Delete a specific item from the customer's cart
@app.route("/place_order/cart/<customer_id>/delete/<item_id>", methods=['DELETE'])
def deleteCustomerCartItem(customer_id, item_id):
    print('----Invoking Cart Microservice----')
    order_result = invoke_http(cart_url+'/'+customer_id+'/delete/' + item_id, method='DELETE')
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Cart Microservice----')
        return {
            "code": 404,
            "data": {
                "customer_id": customer_id
            },
            "message": "Failed to delete cart item."

        }
    print('order_result:', order_result)
    return order_result

#6) Create post cart items to cart DB (NOT COMPLETED YET)
#This route will allow user to update their cart items as well
@app.route("/place_order/cart", methods=['POST'])
def sendCartDataToCartDB():
    print('\n----Invoking Cart Microservice----')
    #The line of code below needs to be integrated with the parts ms to get the JSON data 
    cart_result = invoke_http(cart_url, method='POST')
    if cart_result['code'] == 404 or cart_result['code'] == 500:
        print('----Error in invoking Cart Microservice----')
        return {
            "code": 404,
            "message": "Unable to send order to cart DB."

        }
    print('cart_result:', cart_result['data'])

    if (len(cart_result['data']) > 0):
        send_to_cart_db = invoke_http(cart_url, method='POST', json=cart_result['data'])
        return send_to_cart_db

#7) Get all orders from the order DB
@app.route("/place_order/order", methods=['GET'])
def retrieveAllOrders():
    print('\n----Invoking Order Microservice----')
    order_result = invoke_http(order_url, method='GET')
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Order Microservice----')
        return {
            "code": 404,
            "message": "No orders."
        }
    print('order_result:', order_result['data'])
    return order_result

#8) Get order by customer from order DB
@app.route("/place_order/order/customer/<customer_id>", methods=['GET'])
def retrieveOrdersByCustomer(customer_id):
    print('\n----Invoking Order Microservice----')
    order_result = invoke_http(order_url+'/customer/'+customer_id, method='GET')
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Order Microservice----')
        return {
            "code": 404,
            "data": {
                "customer_id": customer_id
            },
            "message": "No orders."
        }
    print('order_result:', order_result['data'])
    return order_result

#9 Get specific order from order DB
@app.route("/place_order/order/<order_id>", methods=['GET'])
def retrieveOrdersByOrderID(order_id):
    print('\n----Invoking Order Microservice----')
    order_result = invoke_http(order_url+'/'+order_id, method='GET')
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Order Microservice----')
        return {
            "code": 404,
            "message": "No orders."
        }
    print('order_result:', order_result['data'])
    return order_result

#10) Create order (NOT COMPLETED)
@app.route('/place_order/post_order', methods=['POST'])
def createOrder():
    print('\n----Invoking Order Microservice----')
    #line to get retrieve data
    order_result = invoke_http(order_url, method='POST')
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Order Microservice----')
        return {
            "code": 404,
            "message": "Unable to send data to order DB."

        }
    print('cart_result:', order_result['data'])
    send_to_cart_db = invoke_http(cart_url, method='POST', json=order_result['data'])
    return send_to_cart_db

#11) Get total price of a customer's order from the order DB
@app.route("/place_order/order/<customer_id>/<order_id>/total_price", methods=['GET'])
def retrieveCustomerOrderandBill(customer_id, order_id):
    print('----Invoking Order Microservice----')
    order_result = invoke_http(order_url+'/'+customer_id+ '/' + order_id +'/total_price', method='GET')
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Order Microservice----')
        return {
            "code": 404,
            "data": {
                "customer_id": customer_id
            },
            "message": "Order not found."

        }
    print('order_result:', order_result)
    return order_result

#12) Send email to Customer via Notification MS
@app.route("/send-confirmation-email/<customer_id>")
def sendConfirmationEmail(cart_data, customer_name, customer_email):
    payload = {
        "routingKey": "success.email",
        "data": {
            "cart_data": cart_data,
            "customer_name": customer_name,
            "customer_email": customer_email
        }
    }

    # print('----Invoking Notification MS----')
    # notification_result = invoke_http(notification_url, method='POST', json=cart_data)

    print('---- Sending Cart Data to AMQP Exchange----')
    notification_result = invoke_http(amqp_url, method='POST', json=payload)

    print('order_result:', notification_result)
    return notification_result

#13) Send success log to firestore 
def sendSuccessLog(cart_data, date, customer_id):
    payload = {
        "routingKey": "order.log",
        "data": {
            "datetime": json.dumps(date),
            "order_details": cart_data,
            "username": json.dumps(customer_id),
            "usertype": "Customer"
        }
    }

    print('---- Sending Success Data to AMQP Exchange----')
    invoke_http(amqp_url, method='POST', json=payload)


def sendErrorLog(message, customer_id, formatted_date):
    payload = {
        "routingKey": "order.log",
        "data": {
            "datetime": json.dumps(formatted_date),
            "username": json.dumps(customer_id),
            "message": json.dumps(message),
            "usertype": "Customer"
        }
    }

    print('---- Sending Failure Data to AMQP Exchange----')
    invoke_http(amqp_url, method='POST', json=payload)


if __name__ == "__main__":
    print("This is flask " + os.path.basename(__file__) + " for placing an order...")
    app.run(host='0.0.0.0', port=5100, debug=True)
    # Notes for the parameters:
    # - debug=True will reload the program automatically if a change is detected;
    #   -- it in fact starts two instances of the same flask program,
    #       and uses one of the instances to monitor the program changes;
    # - host="0.0.0.0" allows the flask program to accept requests sent from any IP/host (in addition to localhost),
    #   -- i.e., it gives permissions to hosts with any IP to access the flask program,
    #   -- as long as the hosts can already reach the machine running the flask program along the network;
    #   -- it doesn't mean to use http://0.0.0.0 to access the flask program.