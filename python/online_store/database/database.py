# -*- coding: utf-8 -*-
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

def init_app(app):
    db.init_app(app)
    db.create_all(app=app)