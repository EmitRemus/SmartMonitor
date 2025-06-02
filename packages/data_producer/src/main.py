import asyncio

import paho
import paho.mqtt
import paho.mqtt.client
from src.data_production.produce_data import produce_data
from src.make_mqtt.make_mqtt import make_mqtt


async def main():
    client: paho.mqtt.client.Client = make_mqtt()
    client.loop_start()
    try:
        await produce_data(client)
    except Exception as e:
        print(f"An error occurred while producing data: {e}")
    finally:
        client.loop_stop()


if __name__ == "__main__":
    asyncio.run(main())
