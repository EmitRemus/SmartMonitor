# import asyncio
# import pprint
import os

from pymongo.asynchronous import collection as AsyncCollection
from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from typing import List, Dict


load_dotenv()

# Access the URI
uri = os.getenv("MONGODB_URI")

client = AsyncMongoClient(uri, server_api=ServerApi('1'))
db = client.SmartMonitor

Meter: AsyncCollection = db["Meter"]


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