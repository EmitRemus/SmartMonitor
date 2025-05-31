from database import client


async def aggregate_cold_water_by_date():
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor

        pump_cursor = db.pump_station.aggregate([
            {"$unwind": "$history"},
            {
                "$group": {
                    "_id": "$history.date",
                    "expected_total": {"$sum": "$history.value"}
                }
            }
        ])

        pump_data = {}
        async for doc in pump_cursor:
            date_iso = doc["_id"].isoformat()
            pump_data[date_iso] = doc["expected_total"]

        meter_cursor = db.meter.aggregate([
            {"$match": {"type": "cold"}},
            {"$unwind": "$history"},
            {
                "$group": {
                    "_id": "$history.date",
                    "apartment_total": {"$sum": "$history.value"}
                }
            }
        ])

        meter_data = {}
        async for doc in meter_cursor:
            date_iso = doc["_id"].isoformat()
            meter_data[date_iso] = doc["apartment_total"]

        all_dates = set(pump_data.keys()) | set(meter_data.keys())
        result = []

        for date_str in sorted(all_dates):
            result.append({
                "date": date_str,
                "Cold Water Total Expected": round(pump_data.get(date_str, 0), 2),
                "Cold Water Total per Apartment": round(meter_data.get(date_str, 0), 2)
            })

        return result

    except Exception as e:
        print("Aggregation error:", e)
        return []
