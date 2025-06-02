import random

from src.config.environment import ENVIRONMENT
from src.data_listener.make_mqtt.mqtt_on_functions import on_connect, on_disconnect

from paho.mqtt import client as mqtt_client
from paho.mqtt.enums import CallbackAPIVersion

HOSTNAME = "localhost"
PORT = ENVIRONMENT.MOSQUITTO_MQTT_PORT
CLIENT_ID = f"smartmonitor-reader-{random.randint(0, 1000)}"


def make_mqtt() -> mqtt_client.Client:
    client = mqtt_client.Client(client_id=CLIENT_ID, callback_api_version=CallbackAPIVersion.VERSION2)
    client.username_pw_set(ENVIRONMENT.MOSQUITTO_USER, ENVIRONMENT.MOSQUITTO_PASSWORD)

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect

    client.connect(HOSTNAME, PORT)
    return client
