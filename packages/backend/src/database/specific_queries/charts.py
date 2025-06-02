from datetime import datetime
from src.database.database import client


async def aggregate_cold_water_by_date():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor

        pump_cursor = await db.pump_station.aggregate(
            [
                {"$unwind": "$history"},
                {"$group": {"_id": "$history.date", "expected_total": {"$sum": "$history.value"}}},
            ]
        )

        pump_data = {}
        async for doc in pump_cursor:
            timestamp = int(doc["_id"].timestamp() * 1000)
            pump_data[timestamp] = doc["expected_total"]

        meter_cursor = await db.meter.aggregate(
            [
                {"$match": {"type": "cold"}},
                {"$unwind": "$history"},
                {"$group": {"_id": "$history.date", "apartment_total": {"$sum": "$history.value"}}},
            ]
        )

        meter_data = {}
        async for doc in meter_cursor:
            timestamp = int(doc["_id"].timestamp() * 1000)
            meter_data[timestamp] = doc["apartment_total"]

        all_timestamps = set(pump_data.keys()) | set(meter_data.keys())
        pump_series = []
        meter_series = []

        for timestamp_ms in sorted(all_timestamps):
            iso_time = datetime.utcfromtimestamp(timestamp_ms / 1000).isoformat() + "Z"
            pump_series.append([iso_time, pump_data.get(timestamp_ms, 0)])
            meter_series.append([iso_time, meter_data.get(timestamp_ms, 0)])

        return [
            {"name": "Cold Water Total Expected", "data": pump_series},
            {"name": "Cold Water Total per Apartment", "data": meter_series},
        ]

    except Exception as e:
        print("Aggregation error:", e)
        return []


async def aggregate_hot_water_by_date():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor

        pump_cursor = await db.pump_station.aggregate(
            [
                {"$unwind": "$history"},
                {"$group": {"_id": "$history.date", "expected_total": {"$sum": "$history.value"}}},
            ]
        )

        pump_data = {}
        async for doc in pump_cursor:
            timestamp = int(doc["_id"].timestamp() * 1000)
            pump_data[timestamp] = doc["expected_total"]

        meter_cursor = await db.meter.aggregate(
            [
                {"$match": {"type": "hot"}},
                {"$unwind": "$history"},
                {"$group": {"_id": "$history.date", "apartment_total": {"$sum": "$history.value"}}},
            ]
        )

        meter_data = {}
        async for doc in meter_cursor:
            timestamp = int(doc["_id"].timestamp() * 1000)
            meter_data[timestamp] = doc["apartment_total"]

        all_timestamps = set(pump_data.keys()) | set(meter_data.keys())
        pump_series = []
        meter_series = []

        for timestamp_ms in sorted(all_timestamps):
            iso_time = datetime.utcfromtimestamp(timestamp_ms / 1000).isoformat() + "Z"
            pump_series.append([iso_time, pump_data.get(timestamp_ms, 0)])
            meter_series.append([iso_time, meter_data.get(timestamp_ms, 0)])

        return [
            {"name": "Hot Water Total Expected", "data": pump_series},
            {"name": "Hot Water Total per Apartment", "data": meter_series},
        ]

    except Exception as e:
        print("Aggregation error:", e)
        return []


async def export_apart_behaviour_profiles():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col_behaviour = db.apart_behaviour

        usage_profiles = []
        h_factors = []

        async for doc in col_behaviour.find({}, {"usage_profile_id": 1, "h_factor": 1, "_id": 0}):
            usage_profiles.append(doc.get("usage_profile_id"))
            h_factors.append(doc.get("h_factor"))

        return {"usage_profile_id": usage_profiles, "h_factor": h_factors}

    except Exception as e:
        print("Export error:", e)
        return {"usage_profile_id": [], "h_factor": []}
