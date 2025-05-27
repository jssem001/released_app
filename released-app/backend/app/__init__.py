from flask import Flask
from config import Config
from .extensions import db, migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables from .env
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env'))

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # JWT config
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET", "devsecret")
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"

    # Initialize JWT
    jwt = JWTManager(app)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)

    # Import models to register them
    from . import models

    with app.app_context():
        db.create_all()

        # Register auth routes
        from .routes.auth_routes import auth_bp
        app.register_blueprint(auth_bp)
        # Register sub routes
        from .routes.sub_routes import subscription_bp
        app.register_blueprint(subscription_bp)

    @app.route("/")
    def index():
        return {"message": "Released Email App backend is running!"}

    return app

