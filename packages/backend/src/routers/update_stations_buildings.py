from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from datetime import datetime
from bson import ObjectId
from src.database.database import client
from src.database.data_producer.generator_data import (
    aggregate_building_momentary_usage_by_date,
    aggregate_all_pump_station_momentary_usage_by_date,
)

router = APIRouter()


@router.post("/aggregate/update-all-usage")
async def aggregate_and_update_usage_histories():
    try:
        db = client.SmartMonitor
        building_col = db.apartment_building
        station_col = db.pump_station

        building_usage = await aggregate_building_momentary_usage_by_date()
        station_usage = await aggregate_all_pump_station_momentary_usage_by_date(building_usage)

        for building_id, usage_list in building_usage.items():
            for usage in usage_list:
                await building_col.update_one(
                    {"_id": ObjectId(building_id)},
                    {
                        "$push": {
                            "history": {
                                "date": usage["date"],
                                "value hot": usage["hw_momentary_usage"],
                                "value cold": usage["cw_momentary_usage"],
                            }
                        },
                        "$inc": {
                            "total_hw_usage": usage["hw_momentary_usage"],
                            "total_cw_usage": usage["cw_momentary_usage"],
                        },
                        "$set": {"update_time": datetime.utcnow()},
                    },
                )

        for station_id, usage_list in station_usage.items():
            for usage in usage_list:
                await station_col.update_one(
                    {"_id": ObjectId(station_id)},
                    {
                        "$push": {
                            "history": {
                                "date": usage["date"],
                                "value hot": usage["hw_momentary_usage"],
                                "value cold": usage["cw_momentary_usage"],
                            }
                        },
                        "$inc": {
                            "total_hw_usage": usage["hw_momentary_usage"],
                            "total_cw_usage": usage["cw_momentary_usage"],
                        },
                        "$set": {"update_time": datetime.utcnow()},
                    },
                )

        return JSONResponse(
            status_code=status.HTTP_200_OK, content={"message": "Usage data aggregated and updated successfully"}
        )

    except Exception as e:
        print("Aggregation update error:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})
