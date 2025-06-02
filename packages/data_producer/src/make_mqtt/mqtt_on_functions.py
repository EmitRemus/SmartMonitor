import logging
import time

import paho
import paho.mqtt
import paho.mqtt.client
import paho.mqtt.reasoncodes


_FIRST_RECONNECT_DELAY = 1
_RECONNECT_RATE = 2
_MAX_RECONNECT_COUNT = 12
_MAX_RECONNECT_DELAY = 60


def on_connect(_client, _userdata, _flags, rc: paho.mqtt.reasoncodes.ReasonCode, _properties):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)


def on_disconnect(
    client: paho.mqtt.client.Client, _userdata, _disconnect_flags, rc: paho.mqtt.reasoncodes.ReasonCode, _properties
):
    logging.info("Disconnected with result code: %s", rc)
    reconnect_count, reconnect_delay = 0, _FIRST_RECONNECT_DELAY
    while reconnect_count < _MAX_RECONNECT_COUNT:
        logging.info("Reconnecting in %d seconds...", reconnect_delay)
        time.sleep(reconnect_delay)

        try:
            client.reconnect()
            logging.info("Reconnected successfully!")
            return
        except Exception as err:
            logging.error("%s. Reconnect failed. Retrying...", err)

        reconnect_delay *= _RECONNECT_RATE
        reconnect_delay = min(reconnect_delay, _MAX_RECONNECT_DELAY)
        reconnect_count += 1
    logging.info("Reconnect failed after %s attempts. Exiting...", reconnect_count)
