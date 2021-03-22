import json
from flask import Flask, request, jsonify, redirect, session
from datetime import date, datetime, timedelta
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime
import bson
import time
from bson.json_util import dumps
from bson.json_util import loads

app = Flask(__name__)
CORS(app)
app.secret_key = "secrets"
db = MongoClient(
    "mongodb+srv://vkrutarth:Kmvanesa@trips.ugkzb.mongodb.net/trips?retryWrites=true&w=majority",ssl=True,ssl_cert_reqs='CERT_NONE'
)


class DateTimeEncoder(json.JSONEncoder):
    def default(self, z):
        if isinstance(z, datetime.datetime):
            return str(z)
        else:
            return super().default(z)


trips = dict()
buses = dict()
# !Admin Login Logout
@app.route("/admin/login", methods=["POST"])
def admin_login():
    username = request.json.get("username")
    password = request.json.get("password")

    if username == "admin" and password == "admin123":
        session["username"] = username
        print(session)
        return jsonify("Login Success")
    else:
        return jsonify("Login Failed")


@app.route("/admin/logout", methods=["GET"])
def admin_logout():
    if "username" in session:
        session.pop("username", None)
    return jsonify("Logout Success")


# !Add Bus
@app.route("/bus/new", methods=["POST"])
def add_bus():
        bus_id = request.json.get("bus_id")
        start = request.json.get("start")
        end = request.json.get("end")
        date = request.json.get("date")
        duration = request.json.get("duration")
        time = request.json.get("time")
        seats = request.json.get("seats")
        trip = dict(
            start=start,
            end=end,
            duration=duration,
            seats=seats,
            date=datetime.datetime.strptime(date, "%d/%m/%Y"),
            time=time,
            _id=str(bus_id),
        )
        buses[trip["_id"]] = trip
        db["trips"]["buses"].insert_one(trip)
        return jsonify(trip)


# !Get all Bus
@app.route("/bus/all", methods=["GET"])
def all_buses():
    buses = list(db["trips"]["buses"].find())
    return json.dumps(buses, cls=DateTimeEncoder)


# !Delete Bus
@app.route("/bus/delete/<bus_id>", methods=["DELETE"])
def delete_bus(bus_id):
    db["trips"]["buses"].delete_one({"_id": str(bus_id)})
    return jsonify("success")


# !Get all  trips
@app.route("/trip/all", methods=["GET"])
def all_trips():
    trips = list(db["trips"]["trips"].find())
    return json.dumps(trips, cls=DateTimeEncoder)


# !Trip Booking
@app.route("/trip/search", methods=["POST"])
def search_buses():
    start = request.json.get("start")
    end = request.json.get("end")
    trip_date = datetime.datetime.strptime(request.json.get("date"), "%d/%m/%Y")
    buses = list(
        db["trips"]["buses"].find({"start": start, "end": end, "date": trip_date})
    )
    return json.dumps(buses, cls=DateTimeEncoder)


@app.route("/trip/new", methods=["POST"])
def new_trip():
    bus = str(request.json.get("bus"))
    user = request.json.get("user")
    bus_object = db["trips"]["buses"].find_one({"_id": bus})
    trip = dict(
        user=user,
        bus=bus_object,
        booking_time=datetime.datetime.now(),
        _id=str(ObjectId()),
    )
    trips[trip["_id"]] = trip
    db["trips"]["trips"].insert_one(trip)
    return jsonify(trip)


# !Retrieve Booking
@app.route("/trip/booking", methods=["POST"])
def retrieve_booking():
    user = request.json.get("user")
    trip_id = request.json.get("trip_id")
    trips = list(db["trips"]["trips"].find({"_id": trip_id, "user": user}))
    return json.dumps(trips, cls=DateTimeEncoder)


# !Delete Booking
@app.route("/trip/delete/<user>/<trip_id>", methods=["DELETE"])
def delete_booking(user, trip_id):
    db["trips"]["trips"].delete_one({"_id": trip_id, "user": user})
    return jsonify("success")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
