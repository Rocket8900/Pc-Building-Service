from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from invokes import invoke_http
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

cart_url = 'http://localhost:5000/retrieve-cart'
#cart_url = 'http://localhost:5000/cart'
order_url = 'http://localhost:5001/order'
notification_url = 'http://localhost:5900/send-confirmation-email'
parts_url = 'http://localhost:5002/parts'

#1) Post cart data from Cart MS to Order MS, delete cart entry
@app.route("/place_order/<customer_id>", methods=['POST'])
def sendCartDataToOrderDB(cart_data):
    print('\n---- Sending Cart Data to Order DB ----')
    send_to_order_db = invoke_http(order_url, method='POST', json=cart_data['data'])
    return send_to_order_db

#2) Retrieve cart data from Cart MS
@app.route("/place_order/cart/<customer_id>", methods=['GET'])
def retrieveCustomerCart(customer_id):
    print('\n---- Retrieving Cart ----')
    order_result = invoke_http(cart_url, method='POST', json={"customer_id": customer_id})
    #order_result = invoke_http(cart_url + '/' + customer_id, method='GET', json={"customer_id": customer_id})
    for item in order_result['data']['cart_item']:
        price = 0.0
        for part in item['parts']:
            partid = part['parts_id']
            result_from_parts_ms = invoke_http(parts_url + '/' + str(partid), method='GET')
            parts_name = result_from_parts_ms[0]['name']
            parts_price = result_from_parts_ms[0]['price']
            part['parts_name'] = parts_name
            part['parts_price'] = float(parts_price)
            price += float(parts_price)
        item['price'] = price
            
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('---- Error in retrieving cart ----')
        return {
            "code": 404,
            "data": {
                "customer_id": customer_id
            },
            "message": "Cart not found."

        }
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
def deleteCustomerCart(customer_id):
    print('----Invoking Cart Microservice----')
    order_result = invoke_http("http://localhost:5000/delete-cart", method='DELETE', json={"customer_id": customer_id})
    if order_result['code'] == 404 or order_result['code'] == 500:
        print('----Error in invoking Cart Microservice----')
        return {
            "code": 404,
            "data": {
                "customer_id": customer_id
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
def sendConfirmationEmail(cart_data):
    print('----Invoking Notification MS----')
    notification_result = invoke_http(notification_url, method='POST', json=cart_data)
    print('order_result:', notification_result)
    return notification_result

@app.route("/post-payment-processing/<customer_id>")
def postPaymentProcessing(customer_id):
    # Get today's date
    today = datetime.today()

    # Format today's date as a string in the desired format
    formatted_date = today.strftime("%d %B %Y")

    # Retrieving Cart Data ( # 2 )
    cart_data = retrieveCustomerCart(customer_id)
    cart_data["data"]["date"] = formatted_date
    
    # Send Email with Cart Data ( # 12 )
    notification_result = sendConfirmationEmail(cart_data)

    # Save cart data to order db ( # 1 )
    order_result = sendCartDataToOrderDB(cart_data)

    # Delete Cart ( #4 )
    delete_result = deleteCustomerCart(customer_id)

    return notification_result


if __name__ == "__main__":
    print("This is flask " + os.path.basename(__file__) +
          " for placing an order...")
    app.run(host="0.0.0.0", port=5100, debug=True)
    # Notes for the parameters:
    # - debug=True will reload the program automatically if a change is detected;
    #   -- it in fact starts two instances of the same flask program,
    #       and uses one of the instances to monitor the program changes;
    # - host="0.0.0.0" allows the flask program to accept requests sent from any IP/host (in addition to localhost),
    #   -- i.e., it gives permissions to hosts with any IP to access the flask program,
    #   -- as long as the hosts can already reach the machine running the flask program along the network;
    #   -- it doesn't mean to use http://0.0.0.0 to access the flask program.