from fastapi import APIRouter
from fastapi.responses import JSONResponse
from src.database.specific_queries.charts import export_apart_behaviour_profiles

router = APIRouter()


@router.get("/all")
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
        "data": [[uid, h] for uid, h in zip(result["usage_profile_id"], result["h_factor"])],
    }
