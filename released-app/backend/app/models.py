from .extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    subscriptions = db.relationship(
        'Subscription',
        backref='user',
        cascade='all, delete',
        passive_deletes=True
    )

    unsubscribe_actions = db.relationship(
        'UnsubscribeAction',
        backref='user',
        cascade='all, delete',
        passive_deletes=True
    )


class Subscription(db.Model):
    id = db.Column(db.String(128), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    from_ = db.Column('from', db.String(255), nullable=True)
    subject = db.Column(db.String(512))
    unsubscribe_link = db.Column('unsubscribeLink', db.String(512), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    actions = db.relationship(
        'UnsubscribeAction',
        backref='subscription',
        cascade='all, delete',
        passive_deletes=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "from": self.from_,
            "subject": self.subject,
            "unsubscribeLink": self.unsubscribe_link,
            "created_at": self.created_at.isoformat()
        }


class UnsubscribeAction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subscription_id = db.Column(
        db.String(128),
        db.ForeignKey('subscription.id', ondelete='CASCADE'),
        nullable=False
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id', ondelete='CASCADE'),
        nullable=False
    )
    status = db.Column(db.String(32), nullable=False)  # e.g., 'pending', 'success', 'failed'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# from .extensions import db
# from datetime import datetime

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(128), unique=True, nullable=False)
#     password_hash = db.Column(db.String(256), nullable=True)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     subscriptions = db.relationship(
#         'Subscription',
#         backref='user',
#         cascade='all, delete',
#         passive_deletes=True
#     )

# class Subscription(db.Model):
#     id = db.Column(db.String(128), primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     from_ = db.Column('from', db.String(255), nullable=True)
#     subject = db.Column(db.String(512))
#     unsubscribe_link = db.Column('unsubscribeLink', db.String(512), nullable=True)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     # user = db.relationship("User", backref=db.backref("subscriptions", lazy=True))

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "from": self.from_,
#             "subject": self.subject,
#             "unsubscribeLink": self.unsubscribe_link,
#             "created_at": self.created_at.isoformat()
#         }
    
#     actions = db.relationship(
#         'UnsubscribeAction',
#         backref='subscription',
#         cascade='all, delete',
#         passive_deletes=True
#     )

# class UnsubscribeAction(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     # subscription_id = db.Column(db.Integer, db.ForeignKey('subscription.id'), nullable=False)
#     subscription_id = db.Column(db.String(128), db.ForeignKey('subscription.id', ondelete='CASCADE'), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     status = db.Column(db.String(32), nullable=False)  # e.g., 'pending', 'success', 'failed'
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

#     # subscription = db.relationship('Subscription', backref=db.backref('unsubscribe_actions', lazy=True), uselist=False)
#     user = db.relationship('User', backref=db.backref('unsubscribe_actions', lazy=True), uselist=False)