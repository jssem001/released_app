from flask import Flask
from config import Config
from .extensions import db, migrate
from dotenv import load_dotenv
import os

# Load environment variables from .env
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env'))

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Import models to register them
    from . import models

    with app.app_context():
        db.create_all()

        # Register routes
        from .routes.auth_routes import auth_bp
        app.register_blueprint(auth_bp)

    @app.route("/")
    def index():
        return {"message": "Released Email App backend is running!"}

    return app


# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from config import Config
# from .extensions import db, migrate

# # db = SQLAlchemy()

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     db.init_app(app)
#     migrate.init_app(app, db)

#     from . import models

#     with app.app_context():
#         db.create_all()

#         from .routes.auth_routes import auth_bp
#         app.register_blueprint(auth_bp)

#     @app.route("/")
#     def index():
#         return {"message": "Released Email App backend is running!"}

    

#     return app