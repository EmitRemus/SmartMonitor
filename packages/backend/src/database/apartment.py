from src.database.database import client
import asyncio
from bson import ObjectId
from datetime import datetime


async def create_apartments(apartments: list[dict]):
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor
        col = db.apartment

        for apt in apartments:
            apt["building_id"] = ObjectId(apt["building_id"])
            if "meters_id" in apt:
                apt["meters_id"] = [ObjectId(mid) for mid in apt["meters_id"]]

            if "update_time" in apt:
                apt["update_time"] = datetime.fromisoformat(apt["update_time"])

            numeric_fields = [
                "apartment_floor", "apartment_number",
                "total_hw_usage", "total_cw_usage",
                "hw_momentary_usage", "cw_momentary_usage",
                "hw_water_temp", "cw_water_temp"
            ]

            for field in numeric_fields:
                if field in apt:
                    apt[field] = float(apt[field])

        result = await col.insert_many(apartments)
        return {"inserted_ids": [str(_id) for _id in result.inserted_ids]}

    except Exception as e:
        return {"error": str(e)}


async def get_apartments():
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor
        col_apartment = db.apartment

        apartments = []
        async for doc in col_apartment.find({}):
            doc["_id"] = str(doc["_id"])
            apartments.append(doc)

        return apartments

    except Exception as e:
        print(e)
        return []

async def get_apartment_list(last_id = None, limit: int = 20):
    await client.admin.command('ping')
    db = client.SmartMonitor
    col = db.apartment

    query = {}
    if last_id:
        try:
            query["_id"] = {"$gt": ObjectId(last_id)}
        except Exception:
            return {"error": "invalid last_id"}

    cursor = col.find(query).sort("_id",1).limit(limit)

    data = []
    data_id = []

    async for doc in cursor:
        data_id.append(str(doc["_id"]))
        data.append([
            str(doc.get("_id")),
            doc.get("total_cw_usage", None),
            doc.get("total_hw_usage", None),
            doc.get("update_time", None),
        ])

    last_object_id = ObjectId(data_id[-1]) if data_id else None
    remaining_docs = await col.count_documents({"_id": {"$gt": last_object_id}}) if last_object_id else 0
    is_finished = remaining_docs == 0

    response = {
        "columnName": ['apartment_id', 'cold_water', 'hot_water', 'last_updated'],
        "data": data,
        "dataId": data_id,
        "lastId": data_id[-1] if data_id else None,
        "isFinished": is_finished
    }
    print(response)
    return response

# if __name__ == '__main__':
#
#     asyncio.run(get_apartment_list())