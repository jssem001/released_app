import os
from dotenv import load_dotenv 

load_dotenv()

class Config:
    # SECRET_KEY = os.getenv("SECRET_KEY")
    # SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallbackkey')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///fallback.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False