from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import UnsubscribeAction
from datetime import datetime

unsubscribe_bp = Blueprint('unsubscribe', __name__)

@unsubscribe_bp.route('/unsubscribe/log', methods=['POST'])
def log_unsubscribe_action():
    data = request.json

    try:
        action = UnsubscribeAction(
            subscription_id=data['subscription_id'],
            status=data['status'],
            created_at=datetime.utcnow()
        )
        db.session.add(action)
        db.session.commit()
        return jsonify({"message": "Unsubscribe action logged."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
