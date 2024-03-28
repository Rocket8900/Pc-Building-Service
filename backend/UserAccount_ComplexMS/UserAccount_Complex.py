from flask import Flask, request, redirect, session, url_for, jsonify, make_response
from flask_cors import CORS  
import requests
import os
from dotenv import load_dotenv
import jwt
import datetime

load_dotenv()

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:8080"]}})
CORS(app)

app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'default_secret_key') 
client_id = "103401913594-aq4cvr1j7uipabj86vjc4nnv4p418sh6.apps.googleusercontent.com"
client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')  
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret')
redirect_uri = "http://localhost:5015/login/google"

def generate_jwt(user_id,user_role):
    payload = {
        'user_id': user_id,
        'role': user_role,
        'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=3),
        'iat': datetime.datetime.now(datetime.UTC)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def check_or_create_user(user_data):
    simple_service_url = "http://localhost:5010/user"

    response = requests.post(simple_service_url,
                             json=user_data)
    
    if response.status_code == 201:
        response_json = response.json()
        user_id = response_json.get('user_id')  
        message = response_json.get('message')
        return {'message': message, 'user_id': user_id}
    elif response.status_code == 409:
        response_json = response.json()
        message = 'User successfully logged in.'
        user_id = response_json.get('user_id') 
        return {'message': message, 'user_id': user_id}
    elif response.status_code == 400:
        return {'message': 'Error with user data from Google.'}
    else:
        return {'message': 'Error creating user account.'}


@app.route('/get_jwt', methods=['POST'])
def get_jwt():
    data = request.json['tokenResponse']

    credential = data.get('credential')
    google_client_id = data.get('clientId')

    token_info_response = requests.get(
        f'https://oauth2.googleapis.com/tokeninfo?id_token={credential}'
    )

    token_info = token_info_response.json()

    if token_info.get('aud') != google_client_id:
        return jsonify({'error': 'Invalid token'}), 401


    user_info = {
        'user_id': token_info.get('sub'),  
        'name': token_info.get('name'),  
        'email': token_info.get('email'),
    }
    jwt_token = generate_jwt(user_info, "customer")

    return (jwt_token), 200


@app.route('/login/google')
def login_google():
    code = request.args.get('code')
    token_exchange_response = requests.post(
        'https://oauth2.googleapis.com/token',
        data={
            'code': code,
            'client_id': client_id,
            'client_secret': client_secret,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }
    )

    token_data = token_exchange_response.json()

    if token_exchange_response.status_code != 200:
        app.logger.error(f"Failed to exchange token: {token_data}")
        return jsonify(token_data), token_exchange_response.status_code
    
    access_token = token_data.get('access_token')

    profile_response = requests.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        headers={'Authorization': f'Bearer {access_token}'}
    )

    if profile_response.status_code != 200:
        return jsonify({'error': 'Failed to fetch user profile from Google', 'details': profile_response.json()}), 500

    
    profile_data = profile_response.json()


    db_user_data = {
        "googleId": profile_data.get("id"),
        "name": {
            "familyName":profile_data.get("family_name"),
            "givenName":profile_data.get("given_name"),
            "fullName":profile_data.get("name"),
        },
        "contact": {
            "email": profile_data.get("email")
        },
        "profilePictureURL": profile_data.get("picture"),
        "role": "customer"
    }


    user_check_message = check_or_create_user(db_user_data)


    response_data = {
        "db_action": user_check_message,
        "user_info": db_user_data
    }

    user_role = db_user_data['role']

    if 'user_id' in user_check_message:
        user_id = user_check_message['user_id']
        token = generate_jwt(user_id,user_role)
        response_data['token'] = token
        return jsonify(response_data), 200
    else:
        return jsonify({'error': 'Failed to check or create user', 'details': user_check_message}), 500



if __name__ == '__main__':
    app.run(debug=True, port=5015)
