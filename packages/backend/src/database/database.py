# import asyncio
# import pprint
from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://buhaienkomykyta:12344321@cluster0.xgn08.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = AsyncMongoClient(uri, server_api=ServerApi('1'))


