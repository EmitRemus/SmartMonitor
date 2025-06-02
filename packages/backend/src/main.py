from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers.apartment import router as apartment_router
from src.routers.building import router as building_router
from src.routers.pipe import router as pipe_router
from src.routers.pump_station import router as pump_station_router
from src.routers.charts import router as charts
from src.routers.update_stations_buildings import router as update_rest

origins = [
    "http://localhost:7000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(apartment_router, prefix="/apartment")

app.include_router(building_router, prefix="/building")

app.include_router(pipe_router, prefix="/pipe")

app.include_router(pump_station_router, prefix="/pump-station")

app.include_router(charts, prefix="/charts")

app.include_router(update_rest, prefix="/update_rest")


@app.get("/")
async def root():
    return {"message": "Welcome to SmartMonitor server!"}
