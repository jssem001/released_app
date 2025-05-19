from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from .extensions import db, migrate


# db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from . import models

    with app.app_context():
        db.create_all()

    @app.route("/")
    def index():
        return {"message": "Released Email App backend is running!"}

    # Import and register blueprints when ready
    # from .routes.auth_routes import auth_bp
    # app.register_blueprint(auth_bp)

    return app