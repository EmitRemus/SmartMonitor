from datetime import datetime
import asyncio

from src.database.database import client
from bson import ObjectId


async def create_apartment_buildings(buildings: list[dict]):
    try:
        db = client.SmartMonitor
        col = db.building

        for b in buildings:
            b["pipe_id"] = ObjectId(b["pipe_id"])
            b["pump_station_id"] = ObjectId(b["pump_station_id"])

            if "update_time" in b:
                b["update_time"] = datetime.fromisoformat(b["update_time"])

            numeric_fields = [
                "appartments_count",
                "floors_count",
                "total_hw_usage",
                "total_cw_usage",
                "hw_momentary_usage",
                "cw_momentary_usage",
                "hw_water_temp",
                "cw_water_temp",
                "pressure",
            ]

            for field in numeric_fields:
                if field in b:
                    b[field] = float(b[field])

        result = await col.insert_many(buildings)
        return {"inserted_ids": [str(_id) for _id in result.inserted_ids]}

    except Exception as e:
        return {"error": str(e)}


async def get_apartment_buildings():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col = db.apartment_building
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []


async def get_apartment_building_list(last_id=None, limit: int = 20):
    await client.admin.command("ping")
    db = client.SmartMonitor
    col = db.apartment_building

    query = {}
    if last_id:
        try:
            query["_id"] = {"$gt": ObjectId(last_id)}
        except Exception:
            return {"error": "invalid last_id"}

    cursor = col.find(query).sort("_id", 1).limit(limit)

    data = []
    data_id = []

    async for doc in cursor:
        data_id.append(str(doc["_id"]))
        data.append(
            [
                str(doc.get("_id")),
                doc.get("total_cw_usage", None),
                doc.get("total_hw_usage", None),
                doc.get("pressure", None),
                doc.get("update_time", None),
            ]
        )

    last_object_id = ObjectId(data_id[-1]) if data_id else None
    remaining_docs = await col.count_documents({"_id": {"$gt": last_object_id}}) if last_object_id else 0
    is_finished = remaining_docs == 0

    response = {
        "columnName": ["building_id", "cold_water", "hot_water", "pressure", "last_updated"],
        "data": data,
        "dataId": data_id,
        "lastId": data_id[-1] if data_id else None,
        "isFinished": is_finished,
    }
    print(response)
    return response


async def update_apartment_buildings(result: dict):
    """
    {
        "building_id_str": {
            "id": "building_id_str",
            "date": datetime_object,
            "hw_momentary_usage": float,
            "cw_momentary_usage": float
        },
        ...
    }
    """
    db = client.SmartMonitor
    col = db.apartment_building

    operations = []

    for building_id_str, data in result.items():
        building_id = ObjectId(building_id_str)

        update_op = col.update_one(
            {"_id": building_id},
            {
                "$set": {
                    "update_time": data["date"],
                    "hw_momentary_usage": data["hw_momentary_usage"],
                    "cw_momentary_usage": data["cw_momentary_usage"],
                },
                "$inc": {"total_hw_usage": data["hw_momentary_usage"], "total_cw_usage": data["cw_momentary_usage"]},
            },
        )

        operations.append(update_op)

    results = await asyncio.gather(*operations)
    return {"updated": sum(res.modified_count for res in results)}
