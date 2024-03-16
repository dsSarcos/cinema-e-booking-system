import sqlite3
from __main__ import app
from flask import jsonify, request

from query_db import connect_to_db

@app.route('/api/bookings', methods=['GET'])
def api_get_all_bookings():
    return jsonify(get_booking())

def get_booking():
    BOOKINGS = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Booking")
        rows = cur.fetchall()

        # convert row object to dictionary
        for row in rows:
            BOOKING = {}
            BOOKING["ID"] = row["ID"]
            BOOKING["MovieTitle"] = row["MovieTitle"]
            BOOKING["NumberOfTickets"] = row["NumberOfTickets"]
            BOOKING["ShowDate"] = row["ShowDate"]
            BOOKING["ShowTime"] = row["ShowTime"]
            BOOKING["TotalPrice"] = row["TotalPrice"]
            BOOKING["CardNumber"] = row["CardNumber"]
            BOOKING["Seats"] = row["Seats"]
            BOOKING["Email"] = row["Email"]
            BOOKING["PromotionID"] = row["PromotionID"]

            BOOKINGS.append(BOOKING)

    except:
        BOOKINGS = []

    return BOOKINGS


@app.route('/api/bookings/add',  methods=['POST'])
def api_add_booking():
    booking = request.get_json()
    return jsonify(add_booking(booking))

def add_booking(booking):
    print(booking)
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO Booking (MovieTitle, NumberOfTickets, ShowDate, ShowTime, TotalPrice, CardNumber, Seats, Email, PromotionID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (booking['MovieTitle'], booking['NumberOfTickets'], booking['ShowDate'], booking['ShowTime'], booking['TotalPrice'], booking['CardNumber'], booking['Seats'], booking['Email'],booking['PromotionID']))
        conn.commit()
        inserted_booking = booking
    except Exception as e:
        print(e)
        conn.rollback()

    finally:
        conn.close()
    return inserted_booking


@app.route('/api/bookings/update', methods=['PUT'])
def api_update_booking():
    booking = request.get_json()
    return jsonify(update_booking(booking))


def update_booking(booking):
    updated_booking = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE Booking SET MovieTitle = ?, NumberOfTickets = ?, ShowDate = ?, ShowTime = ?, TotalPrice = ?, CardNumber = ?, Seats = ?, Email = ?,PromotionID = ?, WHERE ID =?",
            (booking["MovieTitle"], booking["NumberOfTickets"], booking["ShowDate"], booking["ShowTime"], booking["TotalPrice"], booking["CardNumber"], booking["Seats"], booking["Email"], booking["PromotionID"], booking["ID"],))
        conn.commit()
        updated_booking = get_booking_by_booking_id(booking["ID"])
    except:
        conn.rollback()
        updated_booking = {}
    finally:
        conn.close()
    return updated_booking

def get_booking_by_booking_id(booking_id):
    booking = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Booking WHERE ID = ?", (booking_id,))
        row = cur.fetchone()

        booking["ID"] = row["ID"]
        booking["MovieTitle"] = row["MovieTitle"]
        booking["NumberOfTickets"] = row["NumberOfTickets"]
        booking["ShowDate"] = row["ShowDate"]
        booking["ShowTime"] = row["ShowTime"]
        booking["TotalPrice"] = row["TotalPrice"]
        booking["CardNumber"] = row["CardNumber"]
        booking["Seats"] = row["Seats"]
        booking["Email"] = row["Email"]
        booking["PromotionID"] = row["PromotionID"]

    except:
        booking = {}
    return booking