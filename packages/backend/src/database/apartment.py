from database import client


async def show_apartments():
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