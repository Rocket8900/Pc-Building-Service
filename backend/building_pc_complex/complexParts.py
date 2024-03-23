from flask import Flask, session, request, jsonify
from flask_cors import CORS
from uuid import uuid4
import requests

app = Flask(__name__)
CORS(app) 
app.secret_key = 'your_secret_key_here'



PARTS_SERVICE_URL = 'http://localhost:5950/part'

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

@app.route('/createPc', methods=['POST'])
def create_pc():
    data = request.json
    userId = data.get('userId')
    if not userId:
        return jsonify({"error": "UserId is required"}), 400
    session[userId] = {"pc_name": "", "parts": [], "price": 0}
    session.modified = True
    return jsonify(session[userId]), 200

@app.route('/editPcName', methods=['PUT'])
def edit_pc_name():
    data = request.json
    userId = data.get('userId')
    if not userId:
        return jsonify({"error": "UserId is required"}), 400
    if userId in session:
        session[userId]["pc_name"] = data.get("pc_name", "")
        session.modified = True
        return jsonify(session[userId]), 200
    else:
        return jsonify({"error": "UserId not found"}), 404
    
@app.route('/addPart', methods=['POST'])
def add_part():
    data = request.json
    part_id = data.get('part_id')
    userId = data.get('userId')
    part_details = fetch_part_details(part_id)
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
    data = request.json
    userId = data.get('userId')
    if userId in session:
        return jsonify(session[userId]["parts"]), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@app.route('/getAllPartsWithoutPrice', methods=['POST'])
def get_all_parts_wo():
    data = request.json
    userId = data.get('userId')
    if userId in session:
        parts = session[userId]["parts"]
        parts_without_category_and_price = [{"part_id": part["part_id"]} for part in parts]
        
        return jsonify(parts_without_category_and_price), 200
    else:
        return jsonify({"error": "User not found"}), 404
    

@app.route('/deleteAllParts', methods=['DELETE'])
def delete_all_parts():
    data = request.json
    userId = data.get('userId')
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
    data = request.json
    userId = data.get('userId')
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
    data = request.json
    userId = data.get('userId')
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

@app.route('/clearSession')
def clear_session():
    session.clear()
    session.modified = True
    return 'Session has been cleared.', 200


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port =  5005, debug = True)
