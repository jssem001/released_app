from flask import Blueprint, request, jsonify
from app.models import Subscription
from app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

subscription_bp = Blueprint(
    'subscriptions',
    __name__,
    url_prefix='/subscriptions'
)

@subscription_bp.route('', methods=['GET'])
@jwt_required()
def list_subscriptions():
    user_id = get_jwt_identity()
    subs = Subscription.query.filter_by(user_id=user_id).all()
    return jsonify([ sub.to_dict() for sub in subs ])


@subscription_bp.route('/bulk', methods=['POST'])
@jwt_required()
def bulk_create_subscriptions():
    user_id = get_jwt_identity()
    data = request.json  # Expecting a list of subscription objects

    if not isinstance(data, list):
        return jsonify({"error": "Expected a list of subscriptions"}), 400

    subscriptions = []

    existing_ids = {
    s.id for s in Subscription.query.filter_by(user_id=user_id).all()
    }

    for item in data:
        if item['id'] in existing_ids:
            continue
        subscriptions.append(Subscription(
            id=item.get('id'),
            user_id=user_id,
            from_=item.get('from'),
            subject=item.get('subject'),
            unsubscribe_link=item.get('unsubscribeLink')
        ))

    try:
        db.session.bulk_save_objects(subscriptions)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Duplicate subscription ID(s)"}), 409

    return jsonify({"message": f"{len(subscriptions)} subscriptions saved."}), 201

@subscription_bp.route('/<string:subscription_id>', methods=['DELETE'])
@jwt_required()
def delete_subscription(subscription_id):
    user_id = get_jwt_identity()
    sub = Subscription.query.filter_by(id=subscription_id, user_id=user_id).first()
    if not sub:
        return jsonify({"error": "Subscription not found"}), 404

    db.session.delete(sub)
    db.session.commit()
    return jsonify({"message": f"Subscription {subscription_id} deleted."}), 200

