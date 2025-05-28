# import asyncio
# import pprint
import os

from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

load_dotenv()

# Access the URI
uri = os.getenv("MONGODB_URI")

client = AsyncMongoClient(uri, server_api=ServerApi('1'))


