import asyncio
# import pprint
import os

from pymongo.asynchronous import collection as AsyncCollection
from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from typing import List, Dict
from datetime import datetime
from bson import ObjectId


load_dotenv()

# Access the URI
uri = os.getenv("MONGODB_URI")

client = AsyncMongoClient(uri, server_api=ServerApi('1'))
db = client.SmartMonitor

meter: AsyncCollection = db["meter"]


async def insert_documents(collection_name: str, documents: List[Dict]) -> Dict:
    try:
        await client.admin.command('ping')
        collection = db[collection_name]

        if not documents:
            return {"inserted_count": 0, "message": "No documents provided."}

        result = await collection.insert_many(documents)
        return {
            "inserted_count": len(result.inserted_ids),
            "inserted_ids": [str(doc_id) for doc_id in result.inserted_ids]
        }

    except Exception as e:
        print(f"Error inserting into '{collection_name}':", e)
        return {"inserted_count": 0, "error": str(e)}


async def update_water_metrics(collection_name: str, updates: list[dict]):
    """
    Parameters:
        - collection_name: one of 'apartment', 'building', 'pump_station'
        - updates: list of dicts like:
            {
                "id": "<document_id>",
                "pressure": 2.5,
                "total_hw_usage": 1200.0,
                "total_cw_usage": 1450.0,
                "hw_momentary_usage": 1.2,
                "cw_momentary_usage": 0.9,
                "hw_water_temp": 55.0,
                "cw_water_temp": 18.0,
                "update_time": "2025-06-01T12:00:00"   # optional
            }
    """
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col = getattr(db, collection_name)

        ops = []

        for update in updates:
            doc_id = ObjectId(update["id"])

            update_fields = {}

            for field in [
                "pressure", "total_hw_usage", "total_cw_usage",
                "hw_momentary_usage", "cw_momentary_usage",
                "hw_water_temp", "cw_water_temp"
            ]:
                if field in update:
                    update_fields[field] = float(update[field])

            if "update_time" in update:
                update_fields["update_time"] = datetime.fromisoformat(update["update_time"])

            if update_fields:
                ops.append(
                    col.update_one(
                        {"_id": doc_id},
                        {"$set": update_fields}
                    )
                )

        results = await asyncio.gather(*ops)
        return {
            "modified_counts": [res.modified_count for res in results],
            "matched_counts": [res.matched_count for res in results]
        }

    except Exception as e:
        return {"error": str(e)}