# This is a sample Python script.
from flask import Flask, jsonify, request

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text


# Need this because it initializes the database. Do not remove
import initialize_db

app = Flask(__name__)

# change to name of your database; add path if necessary
db_name = 'cinema.db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)

# Import User Routes
import endpoints.user
import endpoints.shows
import endpoints.movie
import endpoints.paymentInfo
import endpoints.promotion
import endpoints.booking

# NOTHING BELOW THIS LINE NEEDS TO CHANGE
# this route will test the database connection and nothing more
@app.route('/')
def testdb():
    try:
        db.session.query(text('1')).from_statement(text('SELECT 1')).all()
        return '<h1>It works.</h1>'
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)
