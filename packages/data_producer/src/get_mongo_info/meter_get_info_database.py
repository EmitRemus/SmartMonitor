from src.get_mongo_info.database import METER


async def get_all_meter_ids_and_water_usage() -> list[tuple[str, float]]:
    rows = await METER.find({}, {"_id": 1, "history": {"$slice": -1}}).to_list()
    return list((str(row["_id"]), row["history"][0]["value"]) for row in rows)
