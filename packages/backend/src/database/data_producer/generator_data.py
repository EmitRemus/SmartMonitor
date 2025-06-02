import math
from datetime import datetime
import random
from collections import defaultdict
from src.database.database import client
from src.database.tables.apartment import get_apartments
from src.database.specific_queries.apartment_building import get_apartment_buildings
from bson import ObjectId


def sample_from_list(full_list: list, percent: float, shuffle: bool = True) -> list:

    if not (0 < percent <= 100):
        raise ValueError("percent must be between 0 and 100")

    count = max(1, math.floor(len(full_list) * (percent / 100.0)))

    if shuffle:
        return random.sample(full_list, count)
    else:
        return full_list[:count]


def generate_meter_history_entry(meter_ids: list) -> dict:

    now = datetime.now()
    result = {}

    for meter_id in meter_ids:
        result[meter_id] = {"id": meter_id, "date": now, "value": round(random.uniform(0.1, 2.0), 4)}

    return result


def mutate_meter_values(original: dict, ids_to_mutate: list) -> dict:
    for meter_id in ids_to_mutate:
        if meter_id in original:
            reduction_factor = random.uniform(0.85, 0.90)  # 85%–90% of original
            original[meter_id]["value"] = round(original[meter_id]["value"] * reduction_factor, 4)
    return original


async def aggregate_building_momentary_usage(generated_meter_values: dict):
    db = client.SmartMonitor
    apartments = await get_apartments()

    now = datetime.now()
    meter_type_cache = {}

    building_meter_map = {}
    for apt in apartments:
        building_id = str(apt.get("building_id"))
        meter_ids = [str(mid) for mid in apt.get("meters_id", [])]

        if building_id:
            building_meter_map.setdefault(building_id, []).extend(meter_ids)

    all_meter_ids = list({mid for mids in building_meter_map.values() for mid in mids})
    async for meter in db["meter"].find(
        {"_id": {"$in": [ObjectId(mid) for mid in all_meter_ids]}}, {"_id": 1, "meter_type": 1}
    ):
        meter_type_cache[str(meter["_id"])] = meter.get("meter_type", "unknown")

    result = {}
    for building_id, meter_ids in building_meter_map.items():
        hot = 0.0
        cold = 0.0

        for mid in meter_ids:
            value = generated_meter_values.get(mid, {}).get("value", 0.0)
            m_type = meter_type_cache.get(mid)

            if m_type == "hot":
                hot += value
            elif m_type == "cold":
                cold += value

        result[building_id] = {
            "id": building_id,
            "date": now,
            "hw_momentary_usage": round(hot, 4),
            "cw_momentary_usage": round(cold, 4),
        }

    return result


async def aggregate_building_momentary_usage_by_date():
    db = client.SmartMonitor
    apartments = await get_apartments()

    meter_type_cache = {}
    building_meter_map = defaultdict(list)

    for apt in apartments:
        building_id = str(apt.get("building_id"))
        for mid in apt.get("meters_id", []):
            building_meter_map[building_id].append(str(mid))

    all_meter_ids = list({mid for mids in building_meter_map.values() for mid in mids})

    # Fetch meter type for each meter
    async for meter in db["meter"].find(
        {"_id": {"$in": [ObjectId(mid) for mid in all_meter_ids]}}, {"_id": 1, "meter_type": 1}
    ):
        meter_type_cache[str(meter["_id"])] = meter.get("meter_type", "unknown")

    # Fetch all history for those meters
    meter_histories_cursor = await db["meter"].aggregate(
        [
            {"$match": {"_id": {"$in": [ObjectId(mid) for mid in all_meter_ids]}}},
            {"$unwind": "$history"},
            {"$project": {"meter_id": "$_id", "date": "$history.date", "value": "$history.value"}},
        ]
    )

    building_usage_by_date = defaultdict(
        lambda: defaultdict(lambda: {"hw_momentary_usage": 0.0, "cw_momentary_usage": 0.0})
    )

    async for record in meter_histories_cursor:
        meter_id = str(record["meter_id"])
        date = record["date"]
        timestamp = date.replace(second=0, microsecond=0)
        value = record["value"]
        meter_type = meter_type_cache.get(meter_id)

        for building_id, meter_ids in building_meter_map.items():
            if meter_id in meter_ids:
                if meter_type == "hot":
                    building_usage_by_date[building_id][timestamp]["hw_momentary_usage"] += value
                elif meter_type == "cold":
                    building_usage_by_date[building_id][timestamp]["cw_momentary_usage"] += value

    # Format result
    result = defaultdict(list)
    for building_id, usage_per_time in building_usage_by_date.items():
        for timestamp, usage in sorted(usage_per_time.items()):
            result[building_id].append(
                {
                    "id": building_id,
                    "date": timestamp,
                    "hw_momentary_usage": round(usage["hw_momentary_usage"], 4),
                    "cw_momentary_usage": round(usage["cw_momentary_usage"], 4),
                }
            )

    return result


async def aggregate_all_pump_station_momentary_usage(building_usage: dict):
    buildings = await get_apartment_buildings()

    building_to_station = {
        b["_id"]: str(b["pump_station_id"]) for b in buildings if "_id" in b and "pump_station_id" in b
    }

    result = {}

    for building_id, usage in building_usage.items():
        pump_station_id = building_to_station.get(building_id)
        if not pump_station_id:
            continue

        if pump_station_id not in result:
            result[pump_station_id] = {
                "id": pump_station_id,
                "date": usage.get("date"),
                "hw_momentary_usage": 0.0,
                "cw_momentary_usage": 0.0,
            }

        result[pump_station_id]["hw_momentary_usage"] += usage.get("hw_momentary_usage", 0.0)
        result[pump_station_id]["cw_momentary_usage"] += usage.get("cw_momentary_usage", 0.0)

    return result


async def aggregate_all_pump_station_momentary_usage_by_date(building_usage_by_date: dict):
    buildings = await get_apartment_buildings()

    building_to_station = {
        str(b["_id"]): str(b["pump_station_id"]) for b in buildings if "_id" in b and "pump_station_id" in b
    }

    station_usage_by_date = defaultdict(
        lambda: defaultdict(lambda: {"hw_momentary_usage": 0.0, "cw_momentary_usage": 0.0})
    )

    for building_id, usage_list in building_usage_by_date.items():
        station_id = building_to_station.get(building_id)
        if not station_id:
            continue

        for usage in usage_list:
            timestamp = usage["date"]
            station_usage_by_date[station_id][timestamp]["hw_momentary_usage"] += usage.get("hw_momentary_usage", 0.0)
            station_usage_by_date[station_id][timestamp]["cw_momentary_usage"] += usage.get("cw_momentary_usage", 0.0)

    # Format result
    result = defaultdict(list)
    for station_id, usage_per_time in station_usage_by_date.items():
        for timestamp, usage in sorted(usage_per_time.items()):
            result[station_id].append(
                {
                    "id": station_id,
                    "date": timestamp,
                    "hw_momentary_usage": round(usage["hw_momentary_usage"], 4),
                    "cw_momentary_usage": round(usage["cw_momentary_usage"], 4),
                }
            )

    return result
