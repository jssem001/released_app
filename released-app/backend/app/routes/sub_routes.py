from flask import Blueprint, request, jsonify
from app.models import Subscription
from app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

subscription_bp = Blueprint('subscriptions', __name__)

@subscription_bp.route('/subscriptions/bulk', methods=['POST'])
@jwt_required()
def bulk_create_subscriptions():
    user_id = get_jwt_identity()
    data = request.json  # Expecting a list of subscription objects

    if not isinstance(data, list):
        return jsonify({"error": "Expected a list of subscriptions"}), 400

    subscriptions = []
    for item in data:
        subscriptions.append(Subscription(
            user_id=user_id,
            from_name=item.get('from_name'),
            from_email=item.get('from_email'),
            subject=item.get('subject'),
            category=item.get('category'),
            unsub_link=item.get('unsub_link')
        ))

    db.session.bulk_save_objects(subscriptions)
    db.session.commit()

    return jsonify({"message": f"{len(subscriptions)} subscriptions saved."}), 201