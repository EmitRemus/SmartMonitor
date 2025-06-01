from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from src.database.apartment_building import get_apartment_building_list

router = APIRouter()

@router.get('/all')
async def get_all_buildings(last_id: str = Query(default=None), limit: int = Query(default=20)):
    result = await get_apartment_building_list(last_id=last_id, limit=limit)

    if 'error' in result:
        return JSONResponse(status_code=400, content=result)

    return {
        "columns": ["Building ID", "Cold Water", "Hot Water", "Pressure", "Updated at"],
        "data": [
            row + [None] if len(row) == 4 else row
            for row in result["data"]
        ],
        "dataId": result["dataId"]
    }