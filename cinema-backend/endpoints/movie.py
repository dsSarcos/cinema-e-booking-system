from io import BytesIO
import sqlite3
import base64
from __main__ import app
from flask import jsonify, request, send_file

from query_db import connect_to_db


@app.route('/api/movies/update', methods=['PUT'])
def api_update_movie():
    movie = request.get_json()
    return jsonify(update_movie(movie))


def update_movie(movie):
    updated_movie = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE Movie SET Title = ?, Category = ?, Cast = ?, Director = ?, Producer = ?, Synopsis = ?, Runtime = ?, Reviews = ?, Trailer = ?, RatingCode = ?, MovieState = ?, MoviePrice = ? WHERE ID =?",
            (movie["Title"], movie["Category"], movie["Cast"], movie["Director"], movie["Producer"],
             movie["Synopsis"], movie["Runtime"], movie["Reviews"], movie["Trailer"], movie["RatingCode"],
             movie["MovieState"], movie["MoviePrice"], movie["ID"],))
        conn.commit()
        updated_movie = get_movie_by_movie_id(movie["ID"])
    except:
        conn.rollback()
        updated_movie = {}
    finally:
        conn.close()
    return updated_movie


def get_movie_by_movie_id(movie_id):
    movie = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Movie WHERE ID = ?", (movie_id,))
        row = cur.fetchone()

        movie["ID"] = row["ID"]
        movie["Title"] = row["Title"]
        movie["Category"] = row["Category"]
        movie["Cast"] = row["Cast"]
        movie["Director"] = row["Director"]
        movie["Producer"] = row["Producer"]
        movie["Synopsis"] = row["Synopsis"]
        movie["Runtime"] = row["Runtime"]
        movie["Reviews"] = row["Reviews"]
        movie["Trailer"] = row["Trailer"]
        movie["RatingCode"] = row["RatingCode"]
        movie["MovieState"] = row["MovieState"]
        movie["MoviePrice"] = row["MoviePrice"]

    except:
        movie = {}
    return movie


@app.route('/api/movies/add/file/<id>', methods=['POST'])
def addingMoviePoster(id):
    uploaded_file = request.files['file']
    # If file has a name
    if uploaded_file.filename != '':
        data = base64.b64encode(uploaded_file.read())
        # Store in Database
        conn = connect_to_db()
        cur = conn.cursor()
        sql = "UPDATE Movie SET MoviePoster = ? WHERE ID = ?"
        cur.execute(sql, (data, id,))
        conn.commit()

        # print(data)
        print(uploaded_file.read())
        # uploaded_file.stream.read()
    return request.get_data()


@app.route('/api/movies/get/file/<id>', methods=['GET'])
def api_get_movie_poster(id):
    moviePoster = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        sql = "SELECT MoviePoster FROM Movie WHERE ID = ?"
        cur.execute(sql, (id,))
        conn.commit()

        row = cur.fetchone()
        image_data = base64.b64decode(row[0])
        return send_file(BytesIO(image_data), "image")
        # binary_data = base64.b64decode(image_data)
        # print(binary_data)

        # return binary_data

    except Exception as e:
        print(e)
        return {}


@app.route('/api/movies/add', methods=['POST'])
def api_add_movie():
    movie = request.get_json()
    return jsonify(insert_movie(movie))


def insert_movie(movie):
    inserted_movie = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO Movie (Title, Category, Cast, Director, Producer, Synopsis, Runtime, Reviews, Trailer, RatingCode, MovieState, MoviePrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (movie['Title'], movie['Category'], movie['Cast'], movie['Director'], movie['Producer'], movie['Synopsis'],
             movie['Runtime'], movie['Reviews'], movie['Trailer'], movie['RatingCode'], movie['MovieState'],
             movie['MoviePrice']))
        conn.commit()
        inserted_movie["ID"] = cur.lastrowid

    except Exception as e:
        print("This is exception")
        print(e)
        conn.rollback()

    finally:
        conn.close()
    return inserted_movie


@app.route('/api/movies/delete/<movie_id>', methods=['DELETE'])
def api_delete_movie(movie_id):
    return jsonify(delete_movie(movie_id))


def delete_movie(movie_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from Movie WHERE ID = ?",
                     (movie_id,))
        conn.commit()
        message["status"] = "Movie deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete Movie"
    finally:
        conn.close()

    return message


@app.route('/api/movies', methods=['GET'])
def api_get_movies():
    return jsonify(get_movies())


def get_movies():
    movies = []
    # print(movie_title)
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Movie")
        # cur.execute("SELECT * FROM Movie WHERE Title LIKE '%' || ? || '%'", (movie_title,))
        rows = cur.fetchall()
        # convert row object to dictionary
        for row in rows:
            movie = {}
            movie["ID"] = row["ID"]
            movie["Title"] = row["Title"]
            movie["Category"] = row["Category"]
            movie["Cast"] = row["Cast"]
            movie["Director"] = row["Director"]
            movie["Producer"] = row["Producer"]
            movie["Synopsis"] = row["Synopsis"]
            movie["Runtime"] = row["Runtime"]
            movie["Reviews"] = row["Reviews"]
            movie["Trailer"] = row["Trailer"]
            movie["RatingCode"] = row["RatingCode"]
            movie["MovieState"] = row["MovieState"]
            movie["MoviePrice"] = row["MoviePrice"]
            # DO NOT ADD MOVIEPOSTER HERE. IT WILL BREAK
            movies.append(movie)

    except Exception as e:
        print(e)
        movies = []

    return movies


@app.route('/api/movies/<id>', methods=['GET'])
def api_get_movie(id):
    return jsonify(get_movie(id))


def get_movie(title):
    movie = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Movie WHERE Title = ?", (title,))
        row = cur.fetchone()
        if row:
            movie["ID"] = row["ID"]
            movie["Title"] = row["Title"]
            movie["Category"] = row["Category"]
            movie["Cast"] = row["Cast"]
            movie["Director"] = row["Director"]
            movie["Producer"] = row["Producer"]
            movie["Synopsis"] = row["Synopsis"]
            movie["Runtime"] = row["Runtime"]
            movie["Reviews"] = row["Reviews"]
            movie["Trailer"] = row["Trailer"]
            movie["RatingCode"] = row["RatingCode"]
            movie["MovieState"] = row["MovieState"]
            movie["MoviePrice"] = row["MoviePrice"]
            # DO NOT ADD MOVIEPOSTER HERE. IT WILL BREAK
    except Exception as e:
        print(e)

    return movie

@app.route('/api/movies-shows', methods=['GET'])
def api_get_movie_with_shows():
    return jsonify(get_movie_with_shows())

def get_movie_with_shows():
    movies = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM Movie LEFT JOIN Shows USING (Title)")
        rows = cur.fetchall()
        for row in rows:
            movie = {}
            movie["ID"] = row["ID"]
            movie["Title"] = row["Title"]
            movie["Category"] = row["Category"]
            movie["Cast"] = row["Cast"]
            movie["Director"] = row["Director"]
            movie["Producer"] = row["Producer"]
            movie["Synopsis"] = row["Synopsis"]
            movie["Runtime"] = row["Runtime"]
            movie["Reviews"] = row["Reviews"]
            movie["Trailer"] = row["Trailer"]
            movie["RatingCode"] = row["RatingCode"]
            movie["MovieState"] = row["MovieState"]
            movie["MoviePrice"] = row["MoviePrice"]
            movie['ShowDate'] = row['ShowDate']
            movie['ShowTime'] = row['ShowTime']
            movie['ShowDuration'] = row['ShowDuration']
            movie['Title'] = row['Title']
            movie['RoomNumber'] = row['RoomNumber']
            movies.append(movie)

    except Exception as e:
        print(e)
        movies = []

    return movies
