import asyncio
import subprocess
import threading

from src.data_listener.listen_data import listenToMQTT
from src.database.data_producer.producer import cycler

from src.config.environment import ENVIRONMENT


def _start_mqtt():
    mqtt_thread = threading.Thread(target=listenToMQTT, daemon=True)
    mqtt_thread.start()


def production():
    _start_mqtt()
    subprocess.run(f"granian --interface asgi src/main:app --port {ENVIRONMENT.PORT}", check=False)


def development():
    _start_mqtt()
    subprocess.run(f"granian --interface asgi src/main:app --reload --port {ENVIRONMENT.PORT}", check=False)


def run_producer():
    asyncio.run(cycler(2))
