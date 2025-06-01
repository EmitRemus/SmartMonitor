from fastapi import FastAPI

from src.routers.route1 import router as router1
from src.routers.apartment import router as apartment_router
from src.routers.building import router as building_router
from src.routers.pipe import router as pipe_router
from src.routers.pump_station import router as pump_station_router

app = FastAPI()

app.include_router(
    router1,
    prefix="/admin"
)

app.include_router(
    apartment_router,
    prefix='/apartment'
)

app.include_router(
    building_router,
    prefix='/building'
)

app.include_router(
    pipe_router,
    prefix="/pipe"
)

app.include_router(
    pump_station_router,
    prefix="/pump_station"
)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
