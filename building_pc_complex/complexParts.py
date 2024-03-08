from flask import Flask, session, request, jsonify
from uuid import uuid4
import requests

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'



PARTS_SERVICE_URL = 'http://localhost:5002/parts'

def fetch_part_details(part_id):
    try:
        url = f"{PARTS_SERVICE_URL}/{part_id}"
        response = requests.get(url)
        response.raise_for_status() 
        return response.json()
    except requests.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
    return None

@app.route('/createPc', methods=['POST'])
def create_pc():
    pc_id = str(uuid4())
    session[pc_id] = {"pc_name": "", "parts": [], "price": 0}
    session.modified = True
    return jsonify({"pc_id": pc_id}), 200

@app.route('/editPcName/<pcId>', methods=['PUT'])
def edit_pc_name(pcId):
    data = request.json
    if pcId in session:
        session[pcId]["pc_name"] = data.get("pc_name", "")
        session.modified = True
        return jsonify(session[pcId]), 200
    else:
        return jsonify({"error": "PC not found"}), 404
    
@app.route('/addPart/<pcId>', methods=['POST'])
def add_part(pcId):
    data = request.json
    part_id = data['part_id']
    part_details = fetch_part_details(part_id)

    if pcId in session:
        print(f"Before adding part: {session[pcId]['parts']}")
        if part_details is not None:
            session[pcId]["parts"].append(part_details[0])
            if "price" not in session[pcId]:
                session[pcId]["price"] = 0
            session[pcId]["price"] += part_details[0]["price"]
            session.modified = True  
            print(f"After adding part: {session[pcId]['parts']}")
            return jsonify(session[pcId]), 200
        else:
            return jsonify({"error": "Part details not found"}), 404
    else:
        return jsonify({"error": "PC not found"}), 404
    
    
@app.route('/removePart/<pcId>', methods=['DELETE'])
def remove_part(pcId):
    data = request.json
    part_id = int(data['part_id'])

    if pcId in session:

        for i in range (len(session[pcId]["parts"])):
            if session[pcId]["parts"][i]["partid"]==part_id:
                session[pcId]["price"] -= session[pcId]["parts"][i]["price"]
                del session[pcId]["parts"][i]
                session.modified = True
                return jsonify(session[pcId]), 200
        return jsonify({"message": "Part not found"}), 404
    else:
        return jsonify({"error": "PC not found"}), 404

            
@app.route('/getAllParts/<pcId>', methods=['GET'])
def get_all_parts(pcId):
    if pcId in session:
        return jsonify(session[pcId]["parts"]), 200
    else:
        return jsonify({"error": "PC not found"}), 404


@app.route('/deleteAllParts/<pcId>', methods=['DELETE'])
def delete_all_parts(pcId):
    if pcId in session:
        session[pcId]["parts"] = []  
        session[pcId]["price"]=0
        session.modified = True
        return jsonify(session[pcId]), 200
    else:
        return jsonify({"error": "PC not found"}), 404
    
@app.route('/getEntireCart', methods=['GET'])
def get_cart():
    cart_items = []
    customer_id = "Salah"

    for pcId, pc_data in session.items():
        temporary=pc_data
        temporary["pcId"]=pcId
        cart_items.append(temporary)
    

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
