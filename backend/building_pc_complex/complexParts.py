from flask import Flask, session, request, jsonify
from flask_cors import CORS
from uuid import uuid4
import requests
import jwt
import os
from dotenv import load_dotenv

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', "SantaClause123")

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.secret_key = 'your_secret_key_here'
app.config['SESSION_COOKIE_SECURE'] = False

PARTS_SERVICE_URL = 'http://host.docker.internal:5950/part'

# For Decoding the JWT Token
def decode_user(token):
    """
    :param token: jwt token
    :return:
    """
    decoded_data = jwt.decode(jwt=token,
                              key=SECRET_KEY,
                              algorithms=["HS256"])
    return decoded_data


def fetch_part_details(part_id):
    try:
        url = f"{PARTS_SERVICE_URL}"
        data = {'part_id': part_id} 
        response = requests.post(url, json=data)
        response.raise_for_status()
        full_response = response.json()
        simplified_response = {
            "part_category": full_response.get("part_category"),
            "part_id": full_response.get("part_id"),
            "part_price": full_response.get("part_price")
        }
        return simplified_response
    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
    return None

# This runs first when the User clicks "Begin Building"
@app.route('/createPc', methods=['POST'])
def create_pc():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    # Checking if User ID is decoded
    if not userId:
        return jsonify({"error": "UserId is required"}), 400
    
    session[userId] = {"pc_name": "", "parts": [], "price": 0}
    session.modified = True
    print("HERE", session)
    print("HERE2", session[userId])
    return jsonify(session[userId]), 200

@app.route('/editPcName', methods=['PUT'])
def edit_pc_name():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    # Checking if User ID is decoded
    if not userId:
        return jsonify({"error": "UserId is required"}), 400
    if userId in session:
        session[userId]["pc_name"] = request.json.get("pc_name", "")
        session.modified = True
        return jsonify(session[userId]), 200
    else:
        return jsonify({"error": "UserId not found"}), 404
    
@app.route('/addPart', methods=['POST'])
def add_part():
    # Retrieve data from POST request 
    part_id = request.json.get('part_id')
    auth_key_received = request.json.get('auth_key')

        # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    print(userId)
    print(session)
    part_details = fetch_part_details(part_id)
    print(session)
    if userId in session:
        existing_parts = session[userId]['parts']
        print(f"Before adding part: {session[userId]['parts']}")
        if part_details is not None:
            existing_part_index = next((i for i, part in enumerate(existing_parts) if part["part_category"] == part_details["part_category"]), None)
            if existing_part_index is not None:
                session[userId]["price"] -= existing_parts[existing_part_index]["part_price"]
                existing_parts[existing_part_index] = part_details
                
            else:
                existing_parts.append(part_details)
            session[userId]["price"] += part_details["part_price"]
            session.modified = True  
            print(f"After adding part: {session[userId]['parts']}")
            return jsonify(session[userId]), 200
        else:
            return jsonify({"error": "Part details not found"}), 404
    else:
        return jsonify({"error": "PC not found"}), 404
    
    
# @app.route('/removePart/<pcId>', methods=['DELETE'])
# def remove_part(pcId):
#     data = request.json
#     part_id = int(data['part_id'])

#     if pcId in session:

#         for i in range (len(session[pcId]["parts"])):
#             if session[pcId]["parts"][i]["partid"]==part_id:
#                 session[pcId]["price"] -= session[pcId]["parts"][i]["price"]
#                 del session[pcId]["parts"][i]
#                 session.modified = True
#                 return jsonify(session[pcId]), 200
#         return jsonify({"message": "Part not found"}), 404
#     else:
#         return jsonify({"error": "PC not found"}), 404

@app.route('/getAllPartsWithPrice', methods=['POST'])
def get_all_parts_w():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    # Checking if User ID is decoded
    if userId in session:
        return jsonify(session[userId]["parts"]), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
# Alex changed
@app.route('/getAllPartsWithoutPrice', methods=['POST'])
def get_all_parts_wo():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    if userId in session:
        parts = session[userId]["parts"]
        parts_without_category_and_price = [{"part_id": part["part_id"]} for part in parts]
        
        return jsonify(parts_without_category_and_price), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route('/deleteAllParts', methods=['DELETE'])
def delete_all_parts():
    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    if userId in session:
        session[userId]["parts"] = []  
        session[userId]["price"]=0
        session.modified = True
        return jsonify(session[userId]), 200
    else:
        return jsonify({"error": "PC not found"}), 404

@app.route('/getEntireCartWithoutPrice', methods=['POST'])
def get_cart_wo():
    cart_items = {}

    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    customer_id = userId
    if userId in session:
        cart_items["pc_name"]=session[userId]["pc_name"]
        cart_items["parts"]=[]
        for part in session[userId]["parts"]:
            cart_items["parts"].append(
                {
                    "part_id":part["part_id"]
                }
            )
        cart = {
            "customer_id": customer_id,
            "cart_item": cart_items
        }
    return jsonify(cart), 200

@app.route('/getEntireCartWithPrice', methods=['POST'])
def get_cart_w():
    cart_items = {}

    # Retrieving customer_id from POST request
    auth_key_received = request.json.get('auth_key', None)

    # Checking to see if Auth key is received
    if (auth_key_received is None):
        return jsonify({"error": "Auth key is missing"}), 400

    # Decoding the Auth key
    auth_key = decode_user(auth_key_received)

    # Retrieving the userId from Auth Key
    userId = auth_key['user_id']['user_id']

    customer_id = userId
    if userId in session:
        cart_items["pc_name"]=session[userId]["pc_name"]
        cart_items["price"]=session[userId]["price"]
        cart_items["parts"]=[]
        for part in session[userId]["parts"]:
            cart_items["parts"].append(
                {
                    "part_id":part["part_id"],
                    "parts_price":part["part_price"]
                }
            )
        cart = {
            "customer_id": customer_id,
            "cart_item": cart_items
        }
        return jsonify(cart), 200
    return jsonify({"error": "error"}), 404

@app.route('/clearSession')
def clear_session():
    session.clear()
    session.modified = True
    return 'Session has been cleared.', 200


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port =  5005, debug = True)
