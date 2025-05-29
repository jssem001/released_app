from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import UnsubscribeAction
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

unsubscribe_bp = Blueprint('unsubscribe', __name__)

@unsubscribe_bp.route('/unsubscribe/log', methods=['POST'])
@jwt_required()
def log_unsubscribe_action():
    user_id = get_jwt_identity()
    data = request.json

    try:
        action = UnsubscribeAction(
            subscription_id=data['subscription_id'],
            user_id=user_id,
            status=data['status'],
            created_at=datetime.utcnow()
        )
        db.session.add(action)
        db.session.commit()
        return jsonify({"message": "Unsubscribe action logged."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
