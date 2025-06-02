import asyncio
import datetime

from src.database.database import client, meter
from bson import ObjectId
from fastapi import HTTPException, status


async def get_meters():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col = db.meter
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []


async def get_meter_history_by_range(start_date: datetime.date, end_date: datetime.date):
    if start_date > end_date:
        raise HTTPException(detail="Start date is > than end date", status_code=status.HTTP_400_BAD_REQUEST)

    start_datetime = datetime.datetime.combine(start_date, datetime.time.min, tzinfo=datetime.timezone.utc)
    end_datetime = datetime.datetime.combine(end_date, datetime.time.max, tzinfo=datetime.timezone.utc)

    history_filtering = {
        "$filter": {
            "input": "$history",
            "as": "entry",
            "cond": {
                "$and": [
                    {"$gte": ["$$entry.date", start_datetime]},
                    {"$lte": ["$$entry.date", end_datetime]},
                ]
            },
        }
    }

    try:
        result = await (
            await meter.aggregate(
                [
                    {
                        "$addFields": {
                            "meter_mark": "$UNSET",
                            "install_date": "$UNSET",
                            "check_date": "$UNSET",
                            "water_usage": "$UNSET",
                            "history": history_filtering,
                        }
                    }
                ]
            )
        ).to_list(length=None)
        print(result)
        return result
    except Exception as e:
        print("Error:", e)
        return []


async def create_meters(meters: list[dict]):
    """
    at minimum: meter_mark, apartment_id (as string), install_date, check_date, meter_type, water_usage.
    history is optional.
        {
        "meter_mark": "CW-101",
        "apartment_id": "665a38a344b7c4f43f5fc9b7",
        "install_date": "2024-01-01T00:00:00",
        "check_date": "2025-01-01T00:00:00",
        "meter_type": "cold",
        "water_usage": 0.0
    }
    """
    try:
        db = client.SmartMonitor
        col = db.meter

        for meter_entry in meters:
            meter_entry["apartment_id"] = ObjectId(meter_entry["apartment_id"])
            meter_entry.setdefault("history", [])
            meter_entry["install_date"] = datetime.datetime.fromisoformat(meter_entry["install_date"])
            meter_entry["check_date"] = datetime.datetime.fromisoformat(meter_entry["check_date"])

        result = await col.insert_many(meters)
        return {"inserted_ids": [str("_id") for _id in result.inserted_ids]}
    except Exception as e:
        return {"error": str(e)}


async def add_history_entries(updates: list[dict]):
    """
        {
        "meter_id": "ObjectIdString",
        "entries": [
            {"date": "2024-06-01T10:00:00", "value": 123.45},
            ...
        ]
    }
    """

    try:
        db = client.SmartMonitor
        col = db.meter

        ops = []

        for update in updates:
            meter_id = ObjectId(update["meter_id"])
            entries = [{"date": e["date"], "value": float(e["value"])} for e in update["entries"]]

            ops.append(col.update_one({"_id": meter_id}, {"$push": {"history": {"$each": entries}}}))

        results = await asyncio.gather(*ops)
        return {"modified_counts": [res.modified_count for res in results]}

    except Exception as e:
        return {"error": str(e)}


async def get_all_meter_ids():
    await client.admin.command("ping")
    db = client.SmartMonitor
    col = db.meter

    meter_ids = []
    async for doc in col.find({}, {"_id": 1}):
        meter_ids.append(str(doc["_id"]))

    return meter_ids

    # asyncio.run(get_meter_history_by_range(datetime.date(2023, 2, 1), datetime.date(2023,12,31)))


# async def get_all_meter_ids_and_water_usage() -> list[tuple[str, float]]:
#     db = client.SmartMonitor
#     col = db.meter
