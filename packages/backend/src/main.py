from fastapi import FastAPI

from src.routers.route1 import router as router1

app = FastAPI()

app.include_router(
    router1,
    prefix="/admin",
)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
