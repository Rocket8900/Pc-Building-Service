from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
import bson.errors

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/UserAccountDB"
mongo = PyMongo(app)


@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if 'googleId' not in data:
        return jsonify({"error": "Missing googleId"}), 400

    existing_user = mongo.db.users.find_one({"googleId": data['googleId']})
    if existing_user:
        return jsonify({"error": "User with this Google ID already exists", "user_id": str(existing_user['_id'])}), 409

    try:
        result = mongo.db.users.insert_one(data)
        return jsonify({"message": "User created successfully", "user_id": str(result.inserted_id)}), 201
    except PyMongoError as e:
        return jsonify({"error": "Failed to insert user data", "details": str(e)}), 500


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    try:
        user = mongo.db.users.find_one({'_id': ObjectId(id)})
    except bson.errors.InvalidId:
        return jsonify({"error": "Invalid user ID"}), 400

    if user:
        return Response(json_util.dumps(user), mimetype='application/json')
    return jsonify({"error": "User not found"}), 404


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    data = request.json
    try:
        result = mongo.db.users.update_one({'_id': ObjectId(id)}, {'$set': data})
    except bson.errors.InvalidId:
        return jsonify({"error": "Invalid user ID"}), 400

    if result.matched_count:
        return jsonify({"message": "User updated successfully"})
    return jsonify({"error": "User not found"}), 404


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        result = mongo.db.users.delete_one({'_id': ObjectId(id)})
    except bson.errors.InvalidId:
        return jsonify({"error": "Invalid user ID"}), 400

    if result.deleted_count:
        return jsonify({"message": "User deleted successfully"})
    return jsonify({"error": "User not found"}), 404


if __name__ == '__main__':
    app.run(debug=True,  port=5002)


