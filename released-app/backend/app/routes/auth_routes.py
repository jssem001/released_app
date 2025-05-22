from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth.exceptions import GoogleAuthError
from app.models import User
from app.extensions import db
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/google', methods=['POST'])
def google_auth():
    token = request.json.get('token')
    if not token:
        return jsonify({"error": "Missing token"}), 400

    print("🔐 Received token:", token[:30] + "...")  # Trimmed for safety

    # Load environment variables
    GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
    print("🔐 Verifying with CLIENT ID:", GOOGLE_CLIENT_ID)
    JWT_SECRET = os.getenv('JWT_SECRET', 'devsecret')

    if not GOOGLE_CLIENT_ID:
        return jsonify({"error": "Google Client ID not set in env"}), 500

    try:
        # Verify token with Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo.get('email')

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

    except (ValueError, GoogleAuthError) as e:
        print("❌ Auth error:", str(e))
        return jsonify({"error": "Invalid token"}), 401


# from flask import Blueprint, request, jsonify
# from google.oauth2 import id_token
# from google.auth.transport import requests
# from app.models import User
# from app.extensions import db
# import jwt, datetime
# import os

# auth_bp = Blueprint('auth', __name__)

# @auth_bp.route('/auth/google', methods=['POST'])
# def google_auth():
#     token = request.json.get('token')
#     print("Received token:", token)
#     if not token:
#         return jsonify({"error": "Missing token"}), 400

#     try:
#         idinfo = id_token.verify_oauth2_token(token, requests.Request(), os.getenv('GOOGLE_CLIENT_ID'))
#         email = idinfo['email']

#         user = User.query.filter_by(email=email).first()
#         if not user:
#             user = User(email=email)
#             db.session.add(user)
#             db.session.commit()

#         payload = {
#             "user_id": user.id,
#             "email": user.email,
#             "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
#         }
#         secret = os.getenv('JWT_SECRET', 'devsecret')
#         jwt_token = jwt.encode(payload, secret, algorithm="HS256")

#         return jsonify({"token": jwt_token})
    
#     except Exception as e:
#         print("Auth error:", e)
#         return jsonify({"error": "Invalid token"}), 401
