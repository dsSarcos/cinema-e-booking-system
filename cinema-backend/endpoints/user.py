import sqlite3
from __main__ import app

from flask import jsonify, request

from query_db import connect_to_db
#import bcrypt
from passlib.hash import bcrypt


@app.route('/api/users', methods=['GET'])
def api_get_all_users():
    return jsonify(get_users())

def get_users():
    USERS = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM User")
        rows = cur.fetchall()

        # convert row object to dictionary
        for row in rows:
            USER = {}
            USER["ID"] = row["ID"]
            USER["LastName"] = row["LastName"]
            USER["FirstName"] = row["FirstName"]
            USER["Email"] = row["Email"]
            USER["PhoneNumber"] = row["PhoneNumber"]
            USER["IsAdmin"] = row["IsAdmin"]
            USER["IsActive"] = row["IsActive"]
            USER["IsRegistered"] = row["IsRegistered"]

            USERS.append(USER)

    except:
        USERS = []

    return USERS


@app.route('/api/users/<user_id>', methods=['GET'])
def api_get_user(user_id):
    return jsonify(get_user_by_id(user_id))

def get_user_by_id(user_id):
    user = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM User WHERE ID = ?",
                       (user_id,))
        row = cur.fetchone()

        # convert row object to dictionary
        user["ID"] = row["ID"]
        user["LastName"] = row["LastName"]
        user["FirstName"] = row["FirstName"]
        user["Email"] = row["Email"]
        user["PhoneNumber"] = row["PhoneNumber"]
        user["IsAdmin"] = row["IsAdmin"]
        user["IsActive"] = row["IsActive"]
        user["IsRegistered"] = row["IsRegistered"]

    except:
        user = {}

    return user


@app.route('/api/users/authenticate/<email>/<password>', methods=['GET'])
def api_authenticate_user(email, password):
    return jsonify(authenticate_user(email, password))


@app.route('/api/users/add', methods=['POST'])
def api_add_user():
    user = request.get_json()
    return jsonify(insert_user(user))


@app.route('/api/users/update/personal_info', methods=['PUT'])
def api_update_user():
    user = request.get_json()
    return jsonify(update_user(user))


def update_user(user):
    updated_user = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE User SET LastName = ?, FirstName = ?, PhoneNumber = ?, IsRegistered =? WHERE Email =?",
                    (user['LastName'], user['FirstName'], user['PhoneNumber'], user['IsRegistered'], user['Email']))
        conn.commit()
        # return the user
        updated_user = get_user_by_email(user["Email"])

    except:
        conn.rollback()
        updated_user = {}
    finally:
        conn.close()

    return updated_user

def get_user_by_email(user_email):
    user = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM User WHERE EMAIL = ?",
                       (user_email,))
        row = cur.fetchone()

        # convert row object to dictionary
        user["ID"] = row["ID"]
        user["LastName"] = row["LastName"]
        user["FirstName"] = row["FirstName"]
        user["Email"] = row["Email"]
        user["PhoneNumber"] = row["PhoneNumber"]
        user["IsAdmin"] = row["IsAdmin"]
        user["IsActive"] = row["IsActive"]
        user["IsRegistered"] = row["IsRegistered"]

    except:
        user = {}

    return user


@app.route('/api/users/delete/<user_id>', methods=['DELETE'])
def api_delete_user(user_id):
    return jsonify(delete_user(user_id))

def delete_user(user_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from User WHERE ID = ?",
                      (user_id,))
        conn.commit()
        message["status"] = "User deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete user"
    finally:
        conn.close()

    return message

@app.route('/api/users/update/password', methods=['POST'])
def api_update_password():
    passwordUpdate = request.get_json()
    return jsonify(update_password(passwordUpdate))


@app.route('/api/users/update/active_status/<email>', methods=['PUT'])
def api_update_active_status(email):
    status = request.get_json()
    return jsonify(update_active_status(email))


def update_active_status(email):
    updated_active_status = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE User SET IsActive = 1 WHERE Email = ?",
                   ((email,)))
        conn.commit()
        print(email)
    except:
        conn.rollback()
        updated_active_status = {}

    finally:
        conn.close()

    return updated_active_status


def hashData(data):
    # converting data to array of bytes
    bytes = data.encode('utf-8')

    # generating the salt
    #salt = bcrypt.gensalt()

    # Hashing the data
    hashedData = bcrypt.hash(bytes)
    return hashedData


def update_password(passwordUpdate):
    # This message is returned to frontend.
    updated_password = {}
    updated_password["success"] = False

    # User new password
    password = passwordUpdate['Password']

    # Hashing the password
    hashedPassword = hashData(password)

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE User SET Password = ? WHERE Email =?",
                    (hashedPassword, passwordUpdate['Email']))
        conn.commit()
        # return the user
        updated_password["success"] = True
        return updated_password

    except:
        conn.rollback()
    finally:
        conn.close()

    return updated_password


def authenticate_user(email, password):
    user = {}
    try:
        # encoding user password
        userBytes = password.encode('utf-8')

        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM User WHERE Email = ?",
                    (email,))
        row = cur.fetchone()

        #result = bcrypt.checkpw(userBytes, row["Password"])
        result = bcrypt.verify(userBytes, row['Password'])

        if (result != True):
            return user

        # convert row object to dictionary
        user["ID"] = row["ID"]
        user["LastName"] = row["LastName"]
        user["FirstName"] = row["FirstName"]
        user["Email"] = row["Email"]
        user["PhoneNumber"] = row["PhoneNumber"]
        user["IsAdmin"] = row["IsAdmin"]
        user["IsActive"] = row["IsActive"]
        user["IsRegistered"] = row["IsRegistered"]

    except Exception as e:
        print(e)
        user = {}

    return user


def insert_user(user):
    inserted_user = {}
    try:
        # Hashing the password
        hashedPassword = hashData(user['Password'])

        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO User (LastName, FirstName, Email, Password, PhoneNumber, IsAdmin, IsRegistered) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (user['LastName'], user['FirstName'], user['Email'], hashedPassword, user['PhoneNumber'], 0, user['IsRegistered']))
        conn.commit()
        inserted_user = get_user_by_id(cur.lastrowid)
    except:
        conn().rollback()

    finally:
        conn.close()
    return inserted_user






@app.route('/api/users/manage/suspend/<user_id>', methods=['POST'])
def api_suspend_user(user_id):
    return jsonify(manage_suspension(get_user_by_id(user_id),2))

@app.route('/api/users/manage/unsuspend/<user_id>', methods=['POST'])
def api_unsuspend_user(user_id):
    return jsonify(manage_suspension(get_user_by_id(user_id),1))

@app.route('/api/users/manage/promote/<user_id>', methods=['POST'])
def api_promote_user(user_id):
    return jsonify(manage_admin(get_user_by_id(user_id),1))

@app.route('/api/users/manage/demote/<user_id>', methods=['POST'])
def api_demote_user(user_id):
    return jsonify(manage_admin(get_user_by_id(user_id),0))

@app.route('/api/users/manage/subscribe/<user_id>', methods=['POST'])
def api_subscribe_user(user_id):
    return jsonify(manage_subscription(get_user_by_id(user_id),1))

@app.route('/api/users/manage/unsubscribe/<user_id>', methods=['POST'])
def api_unsubscribe_user(user_id):
    return jsonify(manage_subscription(get_user_by_id(user_id),0))


def manage_suspension(user, status: int):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE User SET IsActive = ? WHERE Email =?",
                    (status, user['Email']))
        conn.commit()
        # return the user
        return user

    except:
        conn.rollback()
    finally:
        conn.close()

def manage_admin(user, status: int):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE User SET IsAdmin = ? WHERE Email =?",
                    (status, user['Email']))
        conn.commit()
        # return the user
        return user

    except:
        conn.rollback()
    finally:
        conn.close()

def manage_subscription(user, status: int):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE User SET IsRegistered = ? WHERE Email =?",
                    (status, user['Email']))
        conn.commit()
        # return the user
        return user

    except:
        conn.rollback()
    finally:
        conn.close()

@app.route('/api/admins', methods=['GET'])
def api_get_all_admins():
    users = get_users()
    admins = []
    for user in users:
        if user["IsAdmin"] == 1:
            admins.append(user)
    return jsonify(admins)

@app.route('/api/members', methods=['GET'])
def api_get_all_members():
    users = get_users()
    members = []
    for user in users:
        if user["IsAdmin"] == 0:
            members.append(user)
    return jsonify(members)