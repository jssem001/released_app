from flask import Blueprint, request, jsonify
import requests
from app.models import User
from app.extensions import db
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/google', methods=['POST'])
def google_auth():
    token = request.json.get('token')
    access_token = request.json.get('access_token')
    if not access_token:
        return jsonify({"error": "Missing access token"}), 400

    print("🔐 Received access token:", access_token[:30] + "...")
    JWT_SECRET = os.getenv('JWT_SECRET', 'devsecret')

    try:
        # Fetch user info from Google's userinfo endpoint
        userinfo_res = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )
        if userinfo_res.status_code != 200:
            raise Exception(f"Failed to fetch user info: {userinfo_res.text}")
        userinfo = userinfo_res.json()
        email = userinfo.get('email')

        if not email:
            return jsonify({"error": "Email not present in Google token"}), 400

        # Check if user exists
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(email=email)
            db.session.add(user)
            db.session.commit()
            print(f"✅ Created new user: {email}")
        else:
            print(f"✅ User already exists: {email}")

        # Generate a JWT token for session management
        payload = {
            "user_id": user.id,
            "email": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }

        jwt_token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")

        return jsonify({
            "token": jwt_token,
            "user": {
                "id": user.id,
                "email": user.email
            }
        })

    except ValueError as e:
        print("❌ Auth error:", str(e))
        return jsonify({"error": "Invalid token"}), 401

