from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from pymongo.errors import PyMongoError
from bson import ObjectId, json_util
import bson.errors
from functools import wraps
import jwt
import os

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/UserAccountDB"
mongo = PyMongo(app)
SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]  

        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = mongo.db.users.find_one({"_id": ObjectId(data['user_id'])})
            if not current_user:
                return jsonify({'message': 'User not found!'}), 404
        except:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(current_user, *args, **kwargs)

    return decorated_function

def requires_role(required_role):
    def role_decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            user_role = current_user.get('role')
            if user_role != required_role:
                return jsonify({'message': 'Unauthorized'}), 403
            return f(current_user, *args, **kwargs)
        return decorated_function
    return role_decorator


@app.route('/user', methods=['POST'])
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


@app.route('/user/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    if not current_user:
        return jsonify({"error": "User not found"}), 404
    current_user['_id'] = str(current_user['_id'])  
    return jsonify(current_user)


@app.route('/user/update', methods=['PUT'])
@token_required
def update_user(current_user):
    data = request.json
    try:
        result = mongo.db.users.update_one({'_id': current_user['_id']}, {'$set': data})
        if result.matched_count:
            return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500
    return jsonify({"error": "User not found"}), 404


@app.route('/user/delete', methods=['DELETE'])
@token_required
def delete_user(current_user):
    try:
        result = mongo.db.users.delete_one({'_id': current_user['_id']})
        if result.deleted_count:
            return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500
    return jsonify({"error": "User not found"}), 404

@app.route('/admin/user/<user_id>', methods=['GET'])
@token_required
@requires_role('admin')
def get_user(current_user, user_id):
    try:
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    except bson.errors.InvalidId:
        return jsonify({"error": "Invalid user ID format"}), 400
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True,  port=5010)


