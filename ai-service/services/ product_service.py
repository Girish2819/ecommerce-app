from pymongo import MongoClient
from app.config.settings import settings


client = MongoClient(settings.MONGODB_URI)

db = client[settings.DATABASE_NAME]

products_collection = db["products"]


def search_products(
    query: str = "",
    max_price: float | None = None,
    category: str | None = None,
    limit: int = 5
):
    """
    Search products from MongoDB.
    """

    mongo_query = {}

    # Text search across common product fields
    if query:
        mongo_query["$or"] = [
            {"name": {"$regex": query, "$options": "i"}},
            {"title": {"$regex": query, "$options": "i"}},
            {"description": {"$regex": query, "$options": "i"}},
            {"category": {"$regex": query, "$options": "i"}},
        ]

    if category:
        mongo_query["category"] = {
            "$regex": category,
            "$options": "i"
        }

    if max_price is not None:
        mongo_query["price"] = {
            "$lte": max_price
        }

    products = list(
        products_collection
        .find(mongo_query)
        .limit(limit)
    )

    # Convert MongoDB ObjectId to string
    for product in products:
        product["_id"] = str(product["_id"])

    return products