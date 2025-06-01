import asyncio

from src.database.meter import get_all_meter_ids, add_history_entries
from src.database.apartment_building import update_apartment_buildings
from src.database.pump_station import update_pipe_stations

from src.database.generator_data import (
    sample_from_list,
    generate_meter_history_entry,
    mutate_meter_values,
    aggregate_building_momentary_usage,
    aggregate_all_pump_station_momentary_usage,
)


async def produce_data(meter_ids, to_mutate):

    true_meter_values = generate_meter_history_entry(meter_ids)

    mutated_meter_values = mutate_meter_values(true_meter_values.copy(), to_mutate)

    mutated_building_usage = await aggregate_building_momentary_usage(mutated_meter_values)

    true_building_usage = await aggregate_building_momentary_usage(true_meter_values)
    true_station_usage = await aggregate_all_pump_station_momentary_usage(true_building_usage)

    return (mutated_meter_values, mutated_building_usage, true_station_usage)


async def get_data_from_mqtt(recieved_data: tuple):

    meters, apartment_buildings, pipe_stations = recieved_data

    for meter_id, meter in meters.items():
        meter_insert = {"meter_id": meter_id, "entries": [{"date": meter["date"], "value": meter["value"]}]}
        await add_history_entries([meter_insert])

    await update_apartment_buildings(apartment_buildings)

    await update_pipe_stations(pipe_stations)


async def send_data_mqtt(full_gen_data: tuple):
    await get_data_from_mqtt(full_gen_data)


async def cycler(limit: int = 1):
    meter_ids = await get_all_meter_ids()
    to_mutate = sample_from_list(meter_ids, percent=5)
    x = 0
    while x < limit:
        result = await produce_data(meter_ids, to_mutate)

        await send_data_mqtt(result)

        x += 1


if __name__ == "__main__":

    asyncio.run(cycler(2))
