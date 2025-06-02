from datetime import datetime
from typing import List, TypedDict
from bson import ObjectId
from pymongo import AsyncMongoClient
from pymongo.asynchronous.collection import AsyncCollection
from src.config.environment import ENVIRONMENT

CLIENT = AsyncMongoClient(ENVIRONMENT.MONGODB_URI)
DB = CLIENT.SmartMonitor


class HistoryEntry(TypedDict):
    date: datetime
    value: float


class Meter(TypedDict):
    _id: ObjectId
    meter_mark: str
    apartment_id: ObjectId
    install_date: datetime
    check_date: datetime
    meter_type: str
    water_usage: float
    history: List[HistoryEntry]


METER: AsyncCollection[Meter] = DB["meter"]
