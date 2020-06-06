
from flask import Flask
from peewee import SqliteDatabase

# Register the actual application and it's configs
app = Flask(__name__)
app.config.from_envvar('SETTINGS_PATH')

# Register the database connection
db = SqliteDatabase(app.config['DATABASE'])
