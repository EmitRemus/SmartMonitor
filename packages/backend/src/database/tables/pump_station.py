from datetime import datetime
import asyncio

from src.database.database import client
from src.database.database import update_water_metrics
from bson import ObjectId


async def get_pump_stations():
    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col = db.pump_station
        docs = []
        async for doc in col.find({}):
            doc["_id"] = str(doc["_id"])
            docs.append(doc)
        return docs
    except Exception as e:
        print(e)
        return []


async def create_pump_stations(pump_stations: list[dict]):
    """
        {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'build_year'
        ],
        properties: {
          pipes_ids: {
            bsonType: 'array',
            items: {
              bsonType: 'objectId'
            }
          },
          build_year: {
            bsonType: 'int'
          },
          last_maintenance: {
            bsonType: 'date'
          },
          total_hw_usage: {
            bsonType: 'double'
          },
          total_cw_usage: {
            bsonType: 'double'
          },
          hw_momentary_usage: {
            bsonType: 'double'
          },
          cw_momentary_usage: {
            bsonType: 'double'
          },
          hw_water_temp: {
            bsonType: 'double'
          },
          cw_water_temp: {
            bsonType: 'double'
          },
          pressure: {
            bsonType: 'double'
          },
          history: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: [
                'date',
                'value'
              ],
              properties: {
                date: {
                  bsonType: 'date'
                },
                value: {
                  bsonType: 'double'
                }
              }
            }
          },
          update_time: {
            bsonType: 'date'
          }
        }
      }
    }
    """

    try:
        await client.admin.command("ping")
        db = client.SmartMonitor
        col = db.pump_station

        for station in pump_stations:
            if "pipes_ids" in station:
                station["pipes_ids"] = [ObjectId(pid) for pid in station["pipes_ids"]]

            if "last_maintnance" in station:
                station["last_maintnance"] = datetime.fromisoformat(station["last_maintnance"])

            if "update_time" in station:
                station["update_time"] = datetime.fromisoformat(station["update_time"])

            if "history" in station:
                station["history"] = [
                    {
                        "date": datetime.fromisoformat(entry["date"]),
                        "value hot": float(entry["value hot"]),
                        "value cold": float(entry["value cold"]),
                    }
                    for entry in station["history"]
                ]

        result = await col.insert_many(pump_stations)
        return {"inserted_ids": [str(_id) for _id in result.inserted_ids]}

    except Exception as e:
        return {"error": str(e)}


async def add_pump_station_history(updates: list[dict]):
    """
    {
        "station_id": "ObjectId string",
        "entries": [
            {
                "date": "2025-06-01T12:00:00",
                "value hot": 3.21,
                "value cold": 2.87
            },
            ...
        ]
    }
    """
    try:
        db = client.SmartMonitor
        col = db.pump_station

        ops = []
        metric_updates = []

        for update in updates:
            station_id = ObjectId(update["station_id"])
            entries = [
                {
                    "date": datetime.fromisoformat(e["date"]),
                    "value hot": float(e["value hot"]),
                    "value cold": float(e["value cold"]),
                }
                for e in update["entries"]
            ]

            ops.append(col.update_one({"_id": station_id}, {"$push": {"history": {"$each": entries}}}))

            if entries:
                latest_entry = max(entries, key=lambda e: e["date"])
                metric_updates.append(
                    {
                        "id": str(station_id),
                        "hw_momentary_usage": latest_entry["value hot"],
                        "cw_momentary_usage": latest_entry["value cold"],
                        "update_time": latest_entry["date"].isoformat(),
                    }
                )

        results = await asyncio.gather(*ops)

        if metric_updates:
            metric_result = await update_water_metrics("pump_station", metric_updates)
        else:
            metric_result = {}

        return {
            "history_modified_counts": [r.modified_count for r in results],
            "momentary_update_result": metric_result,
        }

    except Exception as e:
        return {"error": str(e)}


async def get_pump_station_list(last_id=None, limit: int = 20):
    await client.admin.command("ping")
    db = client.SmartMonitor
    col = db.pump_station

    query = {}
    if last_id:
        try:
            query["_id"] = {"$gt": ObjectId(last_id)}
        except Exception:
            return {"error": "invalid last_id"}

    cursor = col.find(query).sort("_id", 1).limit(limit)

    data = []
    data_id = []

    async for doc in cursor:
        data_id.append(str(doc["_id"]))
        data.append(
            [
                str(doc.get("_id")),
                doc.get("total_cw_usage", None),
                doc.get("total_hw_usage", None),
                doc.get("pressure", None),
                doc.get("update_time", None),
            ]
        )

    last_object_id = ObjectId(data_id[-1]) if data_id else None
    remaining_docs = await col.count_documents({"_id": {"$gt": last_object_id}}) if last_object_id else 0
    is_finished = remaining_docs == 0

    response = {
        "columnName": ["station_id", "cold_water", "hot_water", "pressure", "last_updated"],
        "data": data,
        "dataId": data_id,
        "lastId": data_id[-1] if data_id else None,
        "isFinished": is_finished,
    }
    return response


async def update_pipe_stations(result: dict):
    """
    {
        "station_id_str": {
            "id": "station_id_str",
            "date": datetime_object,
            "hw_momentary_usage": float,
            "cw_momentary_usage": float
        },
        ...
    }
    """
    db = client.SmartMonitor
    col = db.pump_station

    operations = []

    for station_id_str, data in result.items():
        station_id = ObjectId(station_id_str)

        update_op = col.update_one(
            {"_id": station_id},
            {
                "$set": {
                    "update_time": data["date"],
                    "hw_momentary_usage": data["hw_momentary_usage"],
                    "cw_momentary_usage": data["cw_momentary_usage"],
                },
                "$inc": {"total_hw_usage": data["hw_momentary_usage"], "total_cw_usage": data["cw_momentary_usage"]},
                "$push": {
                    "history": {
                        "date": data["date"],
                        "value hot": data["hw_momentary_usage"],
                        "value cold": data["cw_momentary_usage"],
                    }
                },
            },
        )
        operations.append(update_op)

    results = await asyncio.gather(*operations)
    return {"updated": sum(res.modified_count for res in results)}
