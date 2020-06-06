
from flask import Flask
from playhouse.flask_utils import FlaskDB
# from peewee import SqliteDatabase

# Register the actual application and it's configs
app = Flask(__name__)
app.config.from_envvar('SETTINGS_PATH')

# Register the database connection
db_wrapper = FlaskDB()
# db = SqliteDatabase(app.config['DATABASE'])
