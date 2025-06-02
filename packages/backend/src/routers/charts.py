from fastapi import APIRouter
from fastapi.responses import JSONResponse
from src.database.specific_queries.charts import aggregate_hot_water_by_date
from src.database.specific_queries.charts import aggregate_cold_water_by_date
from src.database.specific_queries.charts import export_apart_behaviour_profiles
import random

router = APIRouter()


@router.get("/hot-water/totals")
async def get_hot_water_totals():
    try:
        data = await aggregate_hot_water_by_date()

        if not data:
            return JSONResponse(status_code=500, content={"error": "Aggregation failed"})

        return data

    except Exception as e:
        print("Route error:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})


@router.get("/cold-water/totals")
async def get_cold_water_totals():
    try:
        data = await aggregate_cold_water_by_date()

        if not data:
            return JSONResponse(status_code=500, content={"error": "Aggregation failed"})

        return data

    except Exception as e:
        print("Route error:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})


@router.get("/fraud-heatmap")
async def get_fraud_heatmap():
    result = await export_apart_behaviour_profiles()

    if not result.get("usage_profile_id") or not result.get("h_factor"):
        return JSONResponse(status_code=400, content={"error": "Failed to export data"})

    # const _mockedHonestyHeatmap = {
    #   columns: ['ApartmentID', 'FraudFactor'],
    #   data: Array.from({ length: TOTAL_APARTMENTS }, () => [
    #     String(Math.floor(1000000000 + Math.random() * 9000000000)),
    #     Math.floor(Math.random() * 101),
    #   ]),
    # };

    return {
        "columns": ["ApartmentID", "FraudFactor"],
        "data": [
            [uid, h * random.uniform(0.01, 0.85) * 100]
            for uid, h in zip(result["usage_profile_id"], result["h_factor"])
        ],
    }
