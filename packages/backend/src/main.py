from fastapi import FastAPI

from src.routers.apartment import router as apartment_router
from src.routers.building import router as building_router
from src.routers.pipe import router as pipe_router
from src.routers.pump_station import router as pump_station_router
from src.routers.fraud_heatmap import router as fraud_router
from src.routers.total_cold_water import router as cold_total
from src.routers.total_hot_water import router as hot_total
from src.routers.update_stations_buildings import router as update_rest

app = FastAPI()

app.include_router(apartment_router, prefix="/apartment")

app.include_router(building_router, prefix="/building")

app.include_router(pipe_router, prefix="/pipe")

app.include_router(pump_station_router, prefix="/pump_station")

app.include_router(fraud_router, prefix="/fraud_heatmap")

app.include_router(cold_total, prefix="/cold_total")

app.include_router(hot_total, prefix="/hot_total")

app.include_router(update_rest, prefix="/update_rest")


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
