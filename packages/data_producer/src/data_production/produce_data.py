import random
import json
import asyncio
import paho
import paho.mqtt
import paho.mqtt.client
from src.get_mongo_info.meter_get_info_database import get_all_meter_ids_and_water_usage

# MIN_SLEEP_SECONDS = 10 * 60
# MAX_SLEEP_SECONDS = 1 * 60 * 60
MIN_SLEEP_SECONDS = 1 * 2
MAX_SLEEP_SECONDS = 1 * 8

MIN_WATER_USAGE = 0.1
MAX_WATER_USAGE = 1

CHANCE_OF_ANOMALY = 0.05
MIN_ANOMALY = -0.1
MAX_ANOMALY = -2


async def data_publisher(client: paho.mqtt.client.Client, meter_id: str, water_value: float) -> None:
    topic = f"meters/meter{meter_id}/data"
    while True:
        await asyncio.sleep(random.randint(MIN_SLEEP_SECONDS, MAX_SLEEP_SECONDS))

        water_value += random.uniform(a=MIN_WATER_USAGE, b=MAX_WATER_USAGE)
        if random.random() < CHANCE_OF_ANOMALY:
            water_value += random.uniform(a=MIN_ANOMALY, b=MAX_ANOMALY)

        to_publish = {"value": water_value}
        to_publish_str = json.dumps(to_publish)

        print(f"{topic} -> {to_publish_str}")
        client.publish(topic, to_publish_str)


async def produce_data(client: paho.mqtt.client.Client) -> None:
    ids_and_water_usage = await get_all_meter_ids_and_water_usage()
    async_producers = list(data_publisher(client, pair[0], pair[1]) for pair in ids_and_water_usage)

    await asyncio.gather(*async_producers)
