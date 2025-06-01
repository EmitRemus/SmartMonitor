import os
import json
from pathlib import Path
from bson import json_util
from src.database.database import client
from src.database.generator_documents import clear_all_collections  # adjust if needed


BACKUP_DIR = Path(__file__).parent / "database_backup_starting"

COLLECTION_MAP = {
    "SmartMonitor.apart_behaviour.json": "apartment_behaviours",
    "SmartMonitor.apartment.json": "apartment",
    "SmartMonitor.apartment_building.json": "building",
    "SmartMonitor.meter.json": "Meter",
    "SmartMonitor.pipe.json": "pipe",
    "SmartMonitor.pump_station.json": "pump_station",
}

async def restore_all_from_backup():
    await clear_all_collections()
    db = client.SmartMonitor
    results = {}

    for file_name, collection_name in COLLECTION_MAP.items():
        file_path = BACKUP_DIR / file_name
        if not file_path.exists():
            results[collection_name] = "file not found"
            continue

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                documents = json.load(f, object_hook=json_util.object_hook)

            if not isinstance(documents, list):
                raise ValueError("Backup file must contain a list of documents")

            if documents:
                await db[collection_name].insert_many(documents)

            results[collection_name] = f"restored {len(documents)} documents"

        except Exception as e:
            results[collection_name] = f"error: {str(e)}"

    return results

async def run_reset():
    res = await restore_all_from_backup()
    print("reset documents:", res)