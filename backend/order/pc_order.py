import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

from datetime import datetime

app = Flask(__name__)
CORS(app)
#'mysql+mysqlconnector://root:root@localhost:8889/pc_order'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:Cartdbpass@cartdb.cpw8i20y0wi5.ap-southeast-1.rds.amazonaws.com/pc_order'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)


class Pc_Order(db.Model):
    __tablename__ = 'pc_order'

    order_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50), nullable=False)
    customer_id = db.Column(db.String(50), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def json(self):
        dto = {
            'order_id': self.order_id,
            'date': self.date,
            'customer_id': self.customer_id,
            'created': self.created,
        }

        dto['order_item'] = []
        for oi in self.order_item:
            dto['order_item'].append(oi.json())

        return dto

class Order_Item(db.Model):
    __tablename__ = 'order_item'

    item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.ForeignKey(
        'pc_order.order_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)

    pc_name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    # order_id = db.Column(db.String(36), db.ForeignKey('order.order_id'), nullable=False)
    # order = db.relationship('Order', backref='order_item')
    order = db.relationship(
        'Pc_Order', primaryjoin='Order_Item.order_id == Pc_Order.order_id', backref='order_item')

    def json(self):
        dto = {
            'item_id': self.item_id, 'pc_name': self.pc_name, 'price': self.price,'order_id': self.order_id
        }

        dto['parts_item'] = []
        for oi in self.parts_item:
            dto['parts_item'].append(oi.json())
        return dto

class Parts_Item(db.Model):
    __tablename__ = 'parts_item'

    parts_id = db.Column(db.Integer, nullable=False)
    parts_item_pri_key = db.Column(db.Integer, primary_key=True)
    item_id_parts = db.Column(db.Integer, db.ForeignKey(
        'order_item.item_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, index=True)
    parts_name = db.Column(db.String(50), nullable=False)
    parts_price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # order_id = db.Column(db.String(36), db.ForeignKey('order.order_id'), nullable=False)
    # order = db.relationship('Order', backref='order_item')
    order_parts = db.relationship(
        'Order_Item', primaryjoin='Parts_Item.item_id_parts == Order_Item.item_id', backref='parts_item')

    def json(self):
        return {'item_id_parts': self.item_id_parts, 'parts_id': self.parts_id, 'parts_name': self.parts_name, 'parts_price':self.parts_price, 'quantity': self.quantity}

#Get all orders
@app.route("/order")
def get_all():
    orderlist = db.session.scalars(db.select(Pc_Order)).all()
    if len(orderlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "orders": [order.json() for order in orderlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no orders."
        }
    ), 404

#Get specific order
@app.route("/retrieve-order-detail",  methods=['POST'])
def find_by_order_id():

    order_id = request.json.get('orderID', None)

    order = db.session.scalars(
        db.select(Pc_Order).filter_by(order_id=order_id).limit(1)).first()
    if order:
        result = order.json()
        order_data = {
                'customer_id': result['customer_id'],
                'date': result['date'],
                'order_id': result['order_id'],
                'order_item': []
            }
        for order_item in result['order_item']:
            order_item_data = {
                'parts' :[],
                'pc_name' : order_item['pc_name'],
                'price': order_item['price']
            }
            for part_item in order_item['parts_item']:
                order_item_data['parts'].append({
                    'parts_id': part_item['parts_id'],
                    'parts_name': part_item['parts_name'],
                    'parts_price': part_item['parts_price'],
                    'quantity': part_item['quantity']
                })
            order_data['order_item'].append(order_item_data)
        return jsonify(
            {
                "code": 200,
                "data": order_data
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "order_id": order_id
            },
            "message": "Order not found."
        }
    ), 404

#Get orders by customer
@app.route("/retrieve-customer-order", methods=['POST'])
def find_by_customer_id():

    customer_id = request.json.get('customer_id', None)
    # Query all orders for the specified customer ID
    orders = Pc_Order.query.filter_by(customer_id=customer_id).all()

    if orders:
        # Convert orders to JSON format
        orders_json = []
        for order in orders:
            result = order.json()
            order_data = {
                'customer_id': result['customer_id'],
                'date': result['date'],
                'order_id': result['order_id'],
                'order_item': []
            }
            for order_item in result['order_item']:
                order_item_data = {
                    'parts' :[],
                    'pc_name' : order_item['pc_name'],
                    'price': order_item['price']
                }
                for part_item in order_item['parts_item']:
                    order_item_data['parts'].append({
                        'parts_id': part_item['parts_id'],
                        'parts_name': part_item['parts_id'],
                        'parts_price': part_item['parts_price'],
                        'quantity': part_item['quantity']
                    })
                order_data['order_item'].append(order_item_data)
            orders_json.append(order_data)
        return jsonify({"code": 200, "data": orders_json}), 200
    else:
        return jsonify({"code": 404, "message": "Orders not found for the provided customer ID"}), 404


#Create Order
@app.route("/order", methods=['POST'])
def create_order():
    customer_id = request.json.get('customer_id', None)
    date= request.json.get('date', None)
    order = Pc_Order(customer_id=customer_id, date=date)

    cart_items = request.json.get('cart_item')
    for item in cart_items:
        order_item = Order_Item(pc_name=item['pc_name'], price=item['price'])
        parts = item.get('parts', [])
        for part in parts:
            order_item.parts_item.append(Parts_Item(
                parts_id=part['parts_id'], quantity=part['quantity'], parts_name=part['parts_name'], parts_price=part['parts_price']
            ))
        order.order_item.append(order_item)

    try:
        db.session.add(order)
        db.session.commit()
       
    except Exception as e:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred while creating the order. " + str(e)
            }
        ), 500

    #Retrieve the order data including parts
    order_data = {
        "customer_id": order.customer_id,
        'date': order.date,
        "order_id": order.order_id,
        "order_item": []
    }

    for order_item in order.order_item:
        order_item_data = {
            "parts": [],  # Initialize parts list for the order item
            "pc_name": order_item.pc_name,
            'price': order_item.price
        }
        for part_item in order_item.parts_item:
            order_item_data["parts"].append({
                "parts_id": part_item.parts_id,
                'parts_name': part_item.parts_name,
                'parts_price': part_item.parts_price,
                "quantity": part_item.quantity
            })
        order_data["order_item"].append(order_item_data)

    return jsonify(
        {
            "code": 201,
            "data": order_data
        }
    ), 201

#Get total price of order
@app.route("/order/<customer_id>/<order_id>/total_price", methods=['GET'])
def get_order_total_price(customer_id, order_id):
    # Query the cart for the specified customer ID
    order = Pc_Order.query.filter_by(customer_id=customer_id, order_id=order_id).first()
    if not order:
        return jsonify({"code": 404, "message": "Order not found for the provided customer ID"}), 404

    # Query all cart items for the specified cart
    order_items = Order_Item.query.filter_by(order_id=order.order_id).all()

    # Calculate the total price by summing up the prices of all items in the cart
    total_price = sum(item.price for item in order_items)

    return jsonify({"code": 200, "total_price": total_price}), 200

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": manage orders ...")
    app.run(host='0.0.0.0', port=5009, debug=True)