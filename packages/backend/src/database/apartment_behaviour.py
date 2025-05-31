from database import client

async def get_apart_behaviours():
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor
        col = db.apart_behaviour
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []