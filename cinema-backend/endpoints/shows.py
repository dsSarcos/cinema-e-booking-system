from __main__ import app
from flask import jsonify, request

from query_db import delete_showing, get_showing, connect_to_db

@app.route('/api/shows', methods=['GET'])
def api_get_all_shows():
    return jsonify(get_showing())

@app.route('/api/shows/add',  methods = ['POST'])
def api_add_show():
    show = request.get_json()
    return jsonify(add_show(show))

def add_show(show):
    inserted_show = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO Shows (ShowDate, ShowTime, ShowDuration, Title, RoomNumber) VALUES (?, ?, ?, ?, ?)",
                    (show['ShowDate'], show['ShowTime'], show['ShowDuration'], show['Title'], show['RoomNumber']))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return inserted_show

@app.route('/api/shows/delete/<show_id>',  methods = ['DELETE'])
def api_delete_showing(show_id):
    return jsonify(delete_showing(show_id))