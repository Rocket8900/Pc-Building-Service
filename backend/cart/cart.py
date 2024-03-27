import os
import logging
import jwt
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from sqlalchemy.orm import relationship
from flask_cors import CORS
from dotenv import load_dotenv

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'SantaClause123')

from datetime import datetime

app = Flask(__name__)
# CORS(app, resources={r"/cart": {"origins": "http://localhost:5173"}})
CORS(app)
# CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:8080"]}})
#'mysql+mysqlconnector://root:root@localhost:8889/cart'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:secure_password@db:3306/cart'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

def decode_user(token: str):
    """
    :param token: jwt token
    :return:
    """
    decoded_data = jwt.decode(jwt=token,
                              key=SECRET_KEY,
                              algorithms=["HS256"])

    return decoded_data

def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


class Cart(db.Model):
    __tablename__ = 'cart'

    cart_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.String(50), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def json(self):
        dto = {
            'cart_id': self.cart_id,
            'customer_id': self.customer_id,
            'created': self.created,
        }

        dto['cart_item'] = []
        for oi in self.cart_item:
            dto['cart_item'].append(oi.json())

        return dto

class Cart_Item(db.Model):
    __tablename__ = 'cart_item'

    item_id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.ForeignKey(
        'cart.cart_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)

    pc_name = db.Column(db.String(50), nullable=False)


    cart = db.relationship(
        'Cart', primaryjoin='Cart_Item.cart_id == Cart.cart_id', backref='cart_item')
    parts_items = relationship('Parts_Item', cascade='all, delete-orphan', backref='parent_cart_item')

    def json(self):
        dto = {
            'item_id': self.item_id, 'pc_name': self.pc_name, 'cart_id': self.cart_id
        }

        dto['parts_item'] = []
        for oi in self.parts_items:  # Update parts_items here
            dto['parts_item'].append(oi.json())
        return dto

class Parts_Item(db.Model):
    __tablename__ = 'parts_item'

    parts_id = db.Column(db.Integer, nullable=False)
    parts_item_pri_key = db.Column(db.Integer, primary_key=True)
    item_id_parts = db.Column(db.Integer, db.ForeignKey(
        'cart_item.item_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    quantity = db.Column(db.Integer, nullable=False)

    cart_item = relationship('Cart_Item', back_populates='parts_items')
    order_parts = db.relationship(
        'Cart_Item', primaryjoin='Parts_Item.item_id_parts == Cart_Item.item_id', backref='parts_item')

    def json(self):
        return {'item_id_parts': self.item_id_parts, 'parts_id': self.parts_id ,'quantity': self.quantity}
    
#Get cart item of user
@app.route("/retrieve-cart", methods=["POST"])
def get_cart_item():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the customerID from Auth Key
    customer_id = auth_key['user_id']['user_id']

    cart = db.session.scalars(
        db.select(Cart).filter_by(customer_id=customer_id).limit(1)).first()
    if cart:
        result = cart.json()
        cart_data = {
            'customer_id': result['customer_id'],
            'cart_item': []
        }
        for cart_item in result['cart_item']:
            cart_item_data ={
                'parts': [],
                'item_id': cart_item['item_id'],
                "pc_name": cart_item['pc_name']
            }
            for part_item in cart_item['parts_item']:
                cart_item_data['parts'].append({
                    "parts_id": part_item['parts_id'],
                    "quantity": part_item['quantity']
                })
            cart_data['cart_item'].append(cart_item_data)
        return jsonify(
            {
                "code": 200,
                "data":cart_data
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "customer_id": customer_id
            },
            "message": "Order not found."
        }
    ), 404



#Create cart item
@app.route("/cart", methods=['POST'])
def create_cart():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the customerID from Auth Key
    customer_id = auth_key['user_id']['user_id']

    existing_cart = Cart.query.filter_by(customer_id=customer_id).first()
    if existing_cart:
        try:
            # Delete associated cart items
            Cart_Item.query.filter_by(cart_id=existing_cart.cart_id).delete()
            # Delete the cart
            db.session.delete(existing_cart)
            # Commit the transaction
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify(
                {
                    "code": 500,
                    "message": "An error occurred while updating the cart. " + str(e)
                }
            ), 500

    # If the user does not exist, create a new entry
    cart = Cart(customer_id=customer_id)
    # Retrieving cart_item from POST request
    cart_data = request.json.get('cart_data')
    cart_item_data = cart_data['cart_item']

    # Directly access cart_item properties
    cart_item = Cart_Item(pc_name=cart_item_data['pc_name'], cart_id=cart.cart_id) # Set cart_id here
    parts = cart_item_data.get('parts', [])
    for part in parts:
        cart_item.parts_item.append(Parts_Item(
            parts_id=part['part_id'], quantity=part['quantity']
        ))
    cart.cart_item.append(cart_item)

    
    try:
        db.session.add(cart)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred while creating the cart. " + str(e)
            }
        ), 500

    # Construct and return the cart data
    cart_data = construct_cart_data(cart)
    return jsonify(
        {
            "code": 201,
            "data": cart_data
        }
    ), 200 if existing_cart else 201

def construct_cart_data(cart):
    cart_data = {
        "created": cart.created.strftime("%a, %d %b %Y %H:%M:%S GMT"),
        "customer_id": cart.customer_id,
        "cart_id": cart.cart_id,
        "cart_item": []
    }

    for cart_item in cart.cart_item:
        cart_item_data = {
            "item_id": cart_item.item_id,
            "cart_id": cart_item.cart_id,
            "parts": [],  # Initialize parts list for the cart item
            "pc_name": cart_item.pc_name 
        }
        for part_item in cart_item.parts_item:
            cart_item_data["parts"].append({
                "parts_id": part_item.parts_id,
                "quantity": part_item.quantity
            })
        cart_data["cart_item"].append(cart_item_data)

    return cart_data

#Delete a specific item
@app.route("/delete-item", methods=['POST'])
def delete_cart_item():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the customerID from Auth Key
    customer_id = auth_key['user_id']['user_id']

    item_id = request.json.get('item_id', None)
    # Query the cart for the specified customer ID
    cart = Cart.query.filter_by(customer_id=customer_id).first()
    if not cart:
        return jsonify({ "code": 404,"message": "Cart not found for the provided customer ID"}), 404

    # Check if the item exists in the cart
    cart_item = Cart_Item.query.filter_by(cart_id=cart.cart_id, item_id=item_id).first()
    if not cart_item:
        return jsonify({"code": 404, "message": "Item not found in the cart"}), 404

    # Delete the item from the cart
    Parts_Item.query.filter_by(item_id_parts=cart_item.item_id).delete()
    db.session.delete(cart_item)

    # If there are no more items in the cart, remove the cart entry from the database
    if len(cart.cart_item) == 0:
        db.session.delete(cart)
    try:
        db.session.commit()
        return jsonify({"code": 200,"message": "Item deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"code": 500,"message": "Failed to delete item", "error": str(e)}), 500

#Delete the whole cart
@app.route("/delete-cart", methods=['DELETE'])
def delete_cart():

    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the customerID from Auth Key
    customer_id = auth_key['user_id']['user_id']
    
    # Query the cart for the specified customer ID
    cart = Cart.query.filter_by(customer_id=customer_id).first()
    if not cart:
        return jsonify({ "code": 404,"message": "Cart not found for the provided customer ID"}), 404
    
    try:
         # Delete associated cart items
        Cart_Item.query.filter_by(cart_id=cart.cart_id).delete()
        # Delete the cart
        db.session.delete(cart)
        # Commit the transaction
        db.session.commit()
        return jsonify({"code": 200,"message": "Cart deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"code": 500,"message": "Failed to delete cart", "error": str(e)}), 500

#Get the total price
@app.route("/cart/<customer_id>/total_price", methods=['GET'])
def get_cart_total_price(customer_id):
    # Query the cart for the specified customer ID
    cart = Cart.query.filter_by(customer_id=customer_id).first()
    if not cart:
        return jsonify({"code": 404, "message": "Cart not found for the provided customer ID"}), 404

    # Query all cart items for the specified cart
    cart_items = Cart_Item.query.filter_by(cart_id=cart.cart_id).all()

    # Calculate the total price by summing up the prices of all items in the cart
    total_price = sum(item.price for item in cart_items)

    return jsonify({"code": 200, "total_price": total_price}), 200
    

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": manage orders ...")
    app.run(host='0.0.0.0', port=5002, debug=True)