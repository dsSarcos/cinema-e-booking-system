import sqlite3
from __main__ import app
from flask import jsonify, request

from query_db import connect_to_db


@app.route('/api/seats', methods=['GET'])
def api_get_all_seats():
    return jsonify(get_seat())

def get_seat():
    SEATS = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Seat")
        rows = cur.fetchall()

        # convert row object to dictionary
        for row in rows:
            SEAT = {}
            SEAT["AvailSeats"] = row["AvailSeats"]
            SEAT["SeatNumber"] = row["SeatNumber"]
            SEATS.append(SEAT)

    except:
        SEATS = []

    return SEATS


@app.route('/api/seats/add', methods=['POST'])
def api_add_seat():
    seat = request.get_json()
    return jsonify(add_seat(seat))


def add_seat(seat):
    inserted_seat = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO Seat (AvailSeats, SeatNumber) VALUES (?, ?)",
                    (seat['AvailSeats'], seat['SeatNumber']))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return inserted_seat


@app.route('/api/seats/update', methods=['PUT'])
def api_update_seat():
    seat = request.get_json()
    return jsonify(update_seat(seat))


def update_seat(seat):
    updated_seat = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE Seat SET AvailSeats = ?, SeatNumber = ?, WHERE ID =?",
            (seat["AvailSeats"], seat["SeatNumber"], seat["ID"],))
        conn.commit()
        updated_seat = get_seat_by_seat_id(seat["ID"])
    except:
        conn.rollback()
        updated_seat = {}
    finally:
        conn.close()
    return updated_seat


def get_seat_by_seat_id(seat_id):
    seat = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Seat WHERE ID = ?", (seat_id,))
        row = cur.fetchone()

        seat["ID"] = row["ID"]
        seat["AvailSeats"] = row["AvailSeats"]
        seat["SeatNumber"] = row["SeatNumber"]

    except:
        seat = {}
    return seat
