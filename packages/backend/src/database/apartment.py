from database import client
# import asyncio

async def show_apartments():
    try:
        await client.admin.command('ping')
        # print("Connected to MongoDB!")
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

# asyncio.run(show_apartments())