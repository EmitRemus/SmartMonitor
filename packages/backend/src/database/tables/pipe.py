from src.database.database import client
from bson import ObjectId


async def create_pipes(pipes: list[dict]):
    """
    Each pipe must have:
        - build_year (int)
    """
    try:
        db = client.SmartMonitor
        col = db.pipe

        for pipe in pipes:
            if not isinstance(pipe.get("build_year"), int):
                raise ValueError("Each pipe must include an integer 'build_year' field.")

        result = await col.insert_many(pipes)
        return {"inserted_ids": [str(_id) for _id in result.inserted_ids]}

    except Exception as e:
        return {"error": str(e)}


async def get_pipes():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col = db.pipe
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []


async def get_pipe_list(last_id=None, limit: int = 20):
    await client.admin.command("ping")
    db = client.SmartMonitor
    col = db.pipe

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
        data.append([str(doc.get("_id")), str(doc.get("build_year", None))])

    last_object_id = ObjectId(data_id[-1]) if data_id else None
    remaining_docs = await col.count_documents({"_id": {"$gt": last_object_id}}) if last_object_id else 0
    is_finished = remaining_docs == 0

    response = {
        "columnName": ["pipe_id", "build_year"],
        "data": data,
        "dataId": data_id,
        "lastId": data_id[-1] if data_id else None,
        "isFinished": is_finished,
    }
    return response
