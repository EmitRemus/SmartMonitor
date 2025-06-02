from fastapi import APIRouter
from fastapi.responses import JSONResponse
from src.database.specific_queries.charts import aggregate_hot_water_by_date

router = APIRouter()


@router.get("/hot_water/totals")
async def get_cold_water_totals():
    try:
        data = await aggregate_hot_water_by_date()

        if not data:
            return JSONResponse(status_code=500, content={"error": "Aggregation failed"})

        return data

    except Exception as e:
        print("Route error:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})
