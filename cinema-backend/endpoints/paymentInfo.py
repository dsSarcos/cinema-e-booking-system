from __main__ import app

from flask import jsonify, request

import sqlite3

from query_db import connect_to_db

from passlib.hash import cisco_type7

@app.route('/api/paymentInfo/<user_id>', methods=['GET'])
def api_get_paymentInfoByUser(user_id):
    return jsonify(get_paymentInfo_by_user(user_id))

@app.route('/api/paymentInfo/add',  methods = ['POST'])
def api_add_paymentInfoByUser():
    paymentInfo = request.get_json()
    return jsonify(insert_paymentInfo(paymentInfo))

@app.route('/api/paymentInfo/update',  methods = ['PUT'])
def api_update_paymentInfo():
    paymentInfo = request.get_json()
    return jsonify(update_paymentInfo(paymentInfo))

def encodeHash(data):
    #bytes = data.encode('utf-8')

    hashed = cisco_type7.hash(data)

    return hashed

def decodeHash(data):
    data = cisco_type7.decode(data)
    return data

def get_paymentInfo_by_user(user_id):
    PAYMENTINFO = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM PaymentInfo WHERE PaymentInfo.UserID = ?",
                    (user_id,))
        row = cur.fetchone()

        # print(row)

        # convert row object to dictionary
        PAYMENTINFO["ID"] = row["ID"]
        PAYMENTINFO["UserID"] = row["UserID"]
        PAYMENTINFO["HomeAddr"] = row["HomeAddr"]
        PAYMENTINFO["HomeCity"] = row["HomeCity"]
        PAYMENTINFO["HomeState"] = row["HomeState"]
        PAYMENTINFO["HomeZip"] = row["HomeZip"]
        PAYMENTINFO["BillingAddr1"] = row["BillingAddr1"]
        PAYMENTINFO["BillingCity1"] = row["BillingCity1"]
        PAYMENTINFO["BillingState1"] = row["BillingState1"]
        PAYMENTINFO["BillingZip1"] = row["BillingZip1"]
        PAYMENTINFO["BillingAddr2"] = row["BillingAddr2"]
        PAYMENTINFO["BillingCity2"] = row["BillingCity2"]
        PAYMENTINFO["BillingState2"] = row["BillingState2"]
        PAYMENTINFO["BillingZip2"] = row["BillingZip2"]
        PAYMENTINFO["BillingAddr3"] = row["BillingAddr3"]
        PAYMENTINFO["BillingCity3"] = row["BillingCity3"]
        PAYMENTINFO["BillingState3"] = row["BillingState3"]
        PAYMENTINFO["BillingZip3"] = row["BillingZip3"]
        PAYMENTINFO["CardNumber1"] = row["CardNumber1"]
        PAYMENTINFO["ExpMonth1"] = row["ExpMonth1"]
        PAYMENTINFO["ExpYear1"] = row["ExpYear1"]
        PAYMENTINFO["CardNumber2"] = row["CardNumber2"]
        PAYMENTINFO["ExpMonth2"] = row["ExpMonth2"]
        PAYMENTINFO["ExpYear2"] = row["ExpYear2"]
        PAYMENTINFO["CardNumber3"] = row["CardNumber3"]
        PAYMENTINFO["ExpMonth3"] = row["ExpMonth3"]
        PAYMENTINFO["ExpYear3"] = row["ExpYear3"]

        for key in PAYMENTINFO:
            if key != "ID" and key != "UserID" and PAYMENTINFO[key] is not None:
                PAYMENTINFO[key] = decodeHash(PAYMENTINFO[key])

    except Exception as e:
        PAYMENTINFO = {}

    return PAYMENTINFO

def insert_paymentInfo(paymentInfo):
    pass



def update_paymentInfo(paymentInfo):
    updated_paymentInfo = {}
    try:
        conn = connect_to_db()

        for key in paymentInfo:
            if key != "ID" and key != "UserID" and paymentInfo[key] is not None:
                paymentInfo[key] = encodeHash(paymentInfo[key])

        cur = conn.cursor()
        cur.execute("UPDATE PaymentInfo SET HomeAddr = ?, HomeCity = ?, HomeState = ?, HomeZip = ?, BillingAddr1 = ?, BillingCity1 = ?, BillingState1 = ?, BillingZip1 = ?, BillingAddr2 = ?, BillingCity2 = ?, BillingState2 = ?, BillingZip2 = ?, BillingAddr3 = ?, BillingCity3 = ?, BillingState3 = ?, BillingZip3 = ?, CardNumber1 = ?, ExpMonth1 = ?, ExpYear1 = ?, CardNumber2 = ?, ExpMonth2 = ?, ExpYear2 = ?, CardNumber3 = ?, ExpMonth3 = ?, ExpYear3 = ? WHERE UserID =?",
                    (paymentInfo['HomeAddr'], paymentInfo['HomeCity'], paymentInfo['HomeState'], paymentInfo['HomeZip'], paymentInfo['BillingAddr1'], paymentInfo['BillingCity1'], paymentInfo['BillingState1'], paymentInfo['BillingZip1'], paymentInfo['BillingAddr2'], paymentInfo['BillingCity2'], paymentInfo['BillingState2'], paymentInfo['BillingZip2'], paymentInfo['BillingAddr3'], paymentInfo['BillingCity3'], paymentInfo['BillingState3'], paymentInfo['BillingZip3'], paymentInfo['CardNumber1'], paymentInfo['ExpMonth1'], paymentInfo['ExpYear1'], paymentInfo['CardNumber2'], paymentInfo['ExpMonth2'], paymentInfo['ExpYear2'], paymentInfo['CardNumber3'], paymentInfo['ExpMonth3'], paymentInfo['ExpYear3'], paymentInfo['UserID']))
        conn.commit()

    except Exception as e:
        print(e)
        conn.rollback()
        updated_paymentInfo = {}
    finally:
        conn.close()

    return updated_paymentInfo