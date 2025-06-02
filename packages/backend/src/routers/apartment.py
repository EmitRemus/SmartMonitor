from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from src.database.tables.apartment import get_apartment_list

router = APIRouter()


@router.get("/all")
async def get_all_apartments(id: str = Query(default=None), limit: int = Query(default=20)):
    result = await get_apartment_list(last_id=id, limit=limit)
    print(id)
    if "error" in result:
        return JSONResponse(status_code=400, content=result)

    return {
        "data": {
            "columns": ["Apartment ID", "Cold Water", "Hot Water", "Updated at"],
            "data": [row + [None] if isinstance(row, list) and len(row) == 3 else row for row in result["data"]],
            "dataId": result["dataId"],
        },
        "isFinished": result["isFinished"],
        "lastId": result["lastId"],
    }
