import datetime
import time
# import asyncio
from database import client, Meter

from fastapi import HTTPException, status


async def get_meters():
    try:
        await client.admin.command('ping')
        db = client.SmartMonitor
        col = db.meter
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []


async def get_meter_history_by_range(start_date: datetime.date, end_date: datetime.date):
    if start_date > end_date:
        raise HTTPException(detail="Start date is > than end date", status_code=status.HTTP_400_BAD_REQUEST)

    start_datetime = datetime.datetime.combine(start_date, datetime.time.min, tzinfo=datetime.timezone.utc)
    end_datetime = datetime.datetime.combine(end_date, datetime.time.max, tzinfo=datetime.timezone.utc)

    history_filtering = {
        "$filter": {
            "input": "$history",
            "as": "entry",
            "cond": {
                "$and": [
                    {"$gte": ["$$entry.date", start_datetime]},
                    {"$lte": ["$$entry.date", end_datetime]},
                ]
            },
        }
    }

    try:
        result = await (await Meter.aggregate([{
            '$addFields': {
                'meter_mark': '$UNSET',
                'install_date': '$UNSET',
                'check_date': '$UNSET',
                'water_usage': '$UNSET',
                'history': history_filtering
            }
        }])).to_list(length=None)
        print(result)
        return result
    except Exception as e:
        print("Error:", e)
        return []


    # asyncio.run(get_meter_history_by_range(datetime.date(2023, 2, 1), datetime.date(2023,12,31)))