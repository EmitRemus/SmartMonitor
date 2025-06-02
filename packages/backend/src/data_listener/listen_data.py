import datetime
import json
import re
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
from src.config.environment import ENVIRONMENT
from src.data_listener.make_mqtt.make_mqtt import make_mqtt


uri = ENVIRONMENT.MONGODB_URI
dbClient = MongoClient(uri, server_api=ServerApi("1"))
db = dbClient.SmartMonitor
meter = db["meter"]


def insert(meterId: str, value: float | int):
    try:
        object_id = ObjectId(meterId)
        timestamp = datetime.datetime.now()

        meter.update_one(
            {"_id": object_id},
            {"$push": {"history": {"date": timestamp, "value": float(value)}}, "$set": {"water_usage": float(value)}},
        )
    except Exception as e:
        print(f"Got error in insert  of MQTT listener: {e}")


_topicMeterIDPattern = r"^meters/meter([0-9a-f]{24})/data$"


def on_message_handler(_client, _userdata, message):
    data = json.loads(message.payload)
    if "value" not in data or type(data["value"]) not in (int, float):
        print(f"Message handler got invalid payload {message.payload} on topic {message.topic}")
        return

    match = re.match(_topicMeterIDPattern, message.topic)
    if not match:
        print(f"Invalid topic or ObjectId in topic {message.topic}")
        return

    object_id = match.group(1)
    insert(object_id, data["value"])


def listenToMQTT():
    client = make_mqtt()
    client.on_message = on_message_handler
    client.subscribe("meters/+/data")
    client.loop_forever()
