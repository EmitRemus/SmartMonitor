import subprocess
from dotenv import dotenv_values
import logging

logger = logging.getLogger("run_scripts")

config = dotenv_values(".env")


def _assert_environment():
    assert "PORT" in config, "No PORT in .env"


def production():
    _assert_environment()
    subprocess.run(f"granian --interface asgi src/main:app --port {config['PORT']}", check=False)


def development():
    _assert_environment()
    subprocess.run(f"granian --interface asgi src/main:app --reload --port {config['PORT']}", check=False)
