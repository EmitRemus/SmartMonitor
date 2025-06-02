from dataclasses import dataclass
from dotenv import dotenv_values


_config = dotenv_values(".env")

assert "MOSQUITTO_MQTT_PORT" in _config, "No MOSQUITTO_MQTT_PORT in .env"
assert "MOSQUITTO_PASSWORD" in _config, "No MOSQUITTO_PASSWORD in .env"
assert "MOSQUITTO_USER" in _config, "No MOSQUITTO_USER in .env"
assert "MONGODB_URI" in _config, "No MONGODB_URI in .env"


@dataclass
class _environment_dataclass:
    MOSQUITTO_MQTT_PORT: int
    MOSQUITTO_PASSWORD: str
    MOSQUITTO_USER: str
    MONGODB_URI: str


ENVIRONMENT: _environment_dataclass = _environment_dataclass(
    int(str(_config["MOSQUITTO_MQTT_PORT"])),
    str(_config["MOSQUITTO_PASSWORD"]),
    str(_config["MOSQUITTO_USER"]),
    str(_config["MONGODB_URI"]),
)
