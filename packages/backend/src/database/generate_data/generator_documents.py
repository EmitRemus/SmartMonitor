import asyncio
import random
from datetime import datetime

from bson import ObjectId
from src.database.database import client


def generate_water_entry():
    return {
        "date": datetime.now(),
        "value hot": round(random.uniform(0.5, 2.0), 2),
        "value cold": round(random.uniform(0.5, 2.0), 2),
    }


def generate_meter(apartment_id, meter_type):
    entry = {"date": datetime.now(), "value": round(random.uniform(0.5, 2.0), 2)}
    return {
        "_id": ObjectId(),
        "meter_mark": f"{meter_type.upper()}-{random.randint(1000, 9999)}",
        "apartment_id": apartment_id,
        "install_date": datetime.now(),
        "check_date": datetime.now(),
        "meter_type": meter_type,
        "water_usage": entry["value"],
        "history": [entry],
    }, entry["value"]


def generate_apartment(building_id, hw_val, cw_val, meter_ids):
    return {
        "_id": ObjectId(),
        "building_id": building_id,
        "apartment_floor": random.randint(1, 10),
        "apartment_number": random.randint(1, 100),
        "total_hw_usage": hw_val,
        "total_cw_usage": cw_val,
        "hw_momentary_usage": hw_val,
        "cw_momentary_usage": cw_val,
        "hw_water_temp": round(random.uniform(50, 60), 2),
        "cw_water_temp": round(random.uniform(10, 20), 2),
        "meters_id": meter_ids,
        "update_time": datetime.now(),
    }


def generate_building(pipe_id, station_id, address):
    return {
        "_id": ObjectId(),
        "build_year": random.randint(1990, 2020),
        "address": address,
        "pipe_id": pipe_id,
        "pump_station_id": station_id,
        "appartments_count": 0,
        "floors_count": random.randint(3, 10),
        "total_hw_usage": 0.0,
        "total_cw_usage": 0.0,
        "hw_momentary_usage": 0.0,
        "cw_momentary_usage": 0.0,
        "hw_water_temp": 0.0,
        "cw_water_temp": 0.0,
        "pressure": round(random.uniform(2.0, 3.0), 2),
        "update_time": datetime.now(),
    }


def generate_pipe():
    return {"_id": ObjectId(), "build_year": random.randint(1980, 2020)}


def generate_pump_station(pipe_ids):
    entry = generate_water_entry()
    return {
        "_id": ObjectId(),
        "build_year": random.randint(1990, 2020),
        "pipes_ids": pipe_ids,
        "last_maintnance": datetime.now(),
        "total_hw_usage": entry["value hot"] * 500,
        "total_cw_usage": entry["value cold"] * 500,
        "hw_momentary_usage": entry["value hot"] * 500,
        "cw_momentary_usage": entry["value cold"] * 500,
        "hw_water_temp": round(random.uniform(50, 60), 2),
        "cw_water_temp": round(random.uniform(10, 20), 2),
        "pressure": round(random.uniform(2.0, 3.0), 2),
        "history": [entry],
        "update_time": datetime.now(),
    }


async def generate_and_insert_hierarchy(
    num_stations: int = 1,
    buildings_per_station: int = 2,
    apartments_per_building: int = 4,
    existing_station_id: str | None = None,
):
    await client.admin.command("ping")
    db = client.SmartMonitor

    pipe_docs, station_docs, building_docs, apartment_docs, meter_docs, behaviour_docs = [], [], [], [], [], []

    if existing_station_id:
        station_ids = [ObjectId(existing_station_id)]
        num_stations = 1
    else:
        station_ids = []

    for station_index in range(num_stations):
        pipes = [generate_pipe() for _ in range(2)]
        pipe_docs.extend(pipes)
        pipe_ids = [p["_id"] for p in pipes]

        if not existing_station_id:
            station = generate_pump_station(pipe_ids)
            station_docs.append(station)
            station_ids.append(station["_id"])

        for b in range(buildings_per_station):
            station_id = station_ids[station_index]
            pipe_id = pipe_ids[0]

            building = generate_building(pipe_id, station_id, f"{station_id}-Addr-{b + 1}")
            building_docs.append(building)

            for _ in range(apartments_per_building):
                hw_meter, hw_val = generate_meter(None, "hot")
                cw_meter, cw_val = generate_meter(None, "cold")

                apartment = generate_apartment(building["_id"], hw_val, cw_val, [hw_meter["_id"], cw_meter["_id"]])

                hw_meter["apartment_id"] = apartment["_id"]
                cw_meter["apartment_id"] = apartment["_id"]

                apartment_docs.append(apartment)
                meter_docs.extend([hw_meter, cw_meter])

                behaviour_docs.append(
                    {
                        "usage_profile_id": str(apartment["_id"]),
                        "h_factor": 1.0,
                        "loneliness_factor": 1.0,
                        "payment_probability": 1.0,
                    }
                )

    # Insert into MongoDB
    if not existing_station_id:
        await db.pump_station.insert_many(station_docs)
    await db.pipe.insert_many(pipe_docs)
    await db.apartment_building.insert_many(building_docs)
    await db.apartment.insert_many(apartment_docs)
    await db.meter.insert_many(meter_docs)
    await db.apart_behaviour.insert_many(behaviour_docs)

    return {
        "used_station_id": str(station_ids[0]),
        "pipes": len(pipe_docs),
        "stations_created": 0 if existing_station_id else len(station_docs),
        "buildings": len(building_docs),
        "apartments": len(apartment_docs),
        "meters": len(meter_docs),
        "behaviours": len(behaviour_docs),
    }


async def clear_all_collections():

    db = client.SmartMonitor

    collections = ["meter", "apartment", "apartment_building", "pump_station", "pipe", "apart_behaviour"]

    results = {}
    for col in collections:
        result = await db[col].delete_many({})
        results[col] = result.deleted_count

    return results


async def run_gen():
    res = await generate_and_insert_hierarchy(num_stations=2, buildings_per_station=5, apartments_per_building=20)
    print("inserted: ", res)


async def run_clear():
    res = await clear_all_collections()
    print("Cleared documents:", res)


if __name__ == "__main__":

    asyncio.run(run_gen())
