from src.database.database import client
from bson import ObjectId

async def get_pump_stations():
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor
        col = db.pump_station
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []

async def get_pump_station_list(last_id = None, limit: int = 20):
    await client.admin.command('ping')
    db = client.SmartMonitor
    col = db.pump_station

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
            doc.get("pressure", None),
            doc.get("update_time", None)
        ])

    last_object_id = ObjectId(data_id[-1]) if data_id else None
    remaining_docs = await col.count_documents({"_id": {"$gt": last_object_id}}) if last_object_id else 0
    is_finished = remaining_docs == 0

    response = {
        "columnName": ['station_id', 'cold_water', 'hot_water', 'pressure', 'last_updated'],
        "data": data,
        "dataId": data_id,
        "lastId": data_id[-1] if data_id else None,
        "isFinished": is_finished
    }
    print(response)
    return response