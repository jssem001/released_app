from .extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Subscription(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.String(128), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    from_ = db.Column('from', db.String(255), nullable=True)
    # from_email = db.Column(db.String(256))
    subject = db.Column(db.String(512))
    # category = db.Column(db.String(100))
    unsubscribe_link = db.Column('unsubscribeLink', db.String(512), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship("User", backref=db.backref("subscriptions", lazy=True))

class UnsubscribeAction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # subscription_id = db.Column(db.Integer, db.ForeignKey('subscription.id'), nullable=False)
    subscription_id = db.Column(db.String(128), db.ForeignKey('subscription.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(32), nullable=False)  # e.g., 'pending', 'success', 'failed'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    subscription = db.relationship('Subscription', backref=db.backref('unsubscribe_actions', lazy=True), uselist=False)
    user = db.relationship('User', backref=db.backref('unsubscribe_actions', lazy=True), uselist=False)