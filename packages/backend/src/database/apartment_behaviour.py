from database import client



async def create_apartment_behaviours(behaviours: list[dict]):
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor
        col = db.apartment_behaviours

        for b in behaviours:
            for field in ["h_factor", "loneliness_factor", "payment_probability"]:
                if field in b:
                    b[field] = float(b[field])

        result = await col.insert_many(behaviours)
        return {"inserted_ids": [str(_id) for _id in result.inserted_ids]}

    except Exception as e:
        return {"error": str(e)}

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

