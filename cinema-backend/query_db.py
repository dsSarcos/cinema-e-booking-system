import sqlite3

def connect_to_db():
    conn = sqlite3.connect('cinema.db')
    print("Opened database successfully")
    return conn

def insert_promotion(promotion):
    inserted_promotion = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO Promotion (Name, Code, Discount, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)",
                    (promotion['Name'], promotion['Code'], promotion['Discount'], promotion['StartDate'], promotion['EndDate']))
        conn.commit()
    
    except:
        conn.rollback()
    finally:
        conn.close()

    return inserted_promotion

def delete_promotion(promotion_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from Promotion WHERE ID = ?",
                      (promotion_id,))
        conn.commit()
        message["status"] = "Promotion deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete promotion"
    finally:
        conn.close()

    return message

def get_promotions():
    PROMOTIONS = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Promotion")
        rows = cur.fetchall()

        # convert row object to dictionary
        for row in rows:
            PROMOTION = {}
            PROMOTION["ID"] = row["ID"]
            PROMOTION["Name"] = row["Name"]
            PROMOTION["Code"] = row["Code"]
            PROMOTION["Discount"] = row["Discount"]
            PROMOTION["StartDate"] = row["StartDate"]
            PROMOTION["EndDate"] = row["EndDate"]

            PROMOTIONS.append(PROMOTION)

    except:
        PROMOTIONS = []

    return PROMOTIONS

def delete_showing(show_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from Shows WHERE ID = ?",
                      (show_id,))
        conn.commit()
        message["status"] = "Showing deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete showing"
    finally:
        conn.close()

    return message

def get_showing():
    SHOWS = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Shows")
        rows = cur.fetchall()

        # convert row object to dictionary
        for row in rows:
            SHOW = {}
            SHOW["ID"] = row["ID"]
            SHOW["ShowDate"] = row["ShowDate"]
            SHOW["ShowTime"] = row["ShowTime"]
            SHOW["ShowDuration"] = row["ShowDuration"]
            SHOW["Title"] = row["Title"]
            SHOW["RoomNumber"] = row["RoomNumber"]

            SHOWS.append(SHOW)

    except:
        SHOWS = []

    return SHOWS


def delete_user(name):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from Promotion WHERE Name = ?",
                      (name,))
        conn.commit()
        message["status"] = "Promotion deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete promotion"
    finally:
        conn.close()
        
    return message


# conn.commit()
# print("Record created successfully")

# cursor = conn.execute("SELECT id, LASTNAME, FIRSTNAME, EMAIL, USERID, PASSWORD from USER")
#
# for row in cursor:
#     print("ID = ", row[0])
#     print("LASTNAME = ", row[1])
#     print("FIRSTNAME = ", row[2])
#     print("EMAIL = ", row[3])
#     print("USERID = ", row[4])
#     print("PASSWORD = ", row[5]), "\n"
#
# print("Operation success: retrieve all of user data")


