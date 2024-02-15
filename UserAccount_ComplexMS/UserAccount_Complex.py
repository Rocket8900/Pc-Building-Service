from flask import Flask, request, redirect, session, url_for, jsonify
from flask_cors import CORS  
import requests
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/login/*": {"origins": "http://localhost:3000"}})

app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'default_secret_key') 
client_id = "103401913594-aq4cvr1j7uipabj86vjc4nnv4p418sh6.apps.googleusercontent.com"
client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')  
redirect_uri = "http://localhost:5001/login/google"

def check_or_create_user(user_data):
    simple_service_url = "http://localhost:5002/users"

    response = requests.post(simple_service_url,
                             json=user_data)

    if response.status_code == 409:
        return 'User successfully logged in.'
    elif response.status_code == 201:
        return 'User account created successfully.'
    elif response.status_code == 400:
        return 'Error with user data from Google.'
    else:
        return 'Error creating user account.'


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
        return jsonify(profile_response.json()), profile_response.status_code
    
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
        "profilePictureURL": profile_data.get("picture")
    }

    session['access_token'] = access_token

    user_check_message = check_or_create_user(db_user_data)

    response_data = {
        "db_action": user_check_message,
        "user_info": db_user_data
    }
    return jsonify(response_data)



if __name__ == '__main__':
    app.run(debug=True, port=5001)
