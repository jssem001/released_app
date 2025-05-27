from .extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # 🔗 Foreign key: Links this subscription to a user account via user.id

    from_name = db.Column(db.String(256))
    # 🧾 The display name from the email sender, e.g., "Amazon News"

    from_email = db.Column(db.String(256))
    # 📧 The actual sender's email address, e.g., "news@amazon.com"

    subject = db.Column(db.String(512))
    # 📰 The subject line of the subscription email

    category = db.Column(db.String(100))
    # 🗂️ A tag or category label (e.g., "Shopping", "News", "Entertainment")

    unsub_link = db.Column(db.Text)
    # 🔗 The unsubscribe URL extracted from headers or HTML content

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # 🕓 Timestamp when this subscription record was saved to the database

    user = db.relationship("User", backref=db.backref("subscriptions", lazy=True))
    # ↔️ Enables `user.subscriptions` access from User instances