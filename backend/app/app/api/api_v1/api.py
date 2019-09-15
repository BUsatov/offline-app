from fastapi import APIRouter

from app.api.api_v1.endpoints import items, events, login, users, utils, categories, resource_types, cities, resources

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(
    categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(
    resource_types.router, prefix="/resource-types", tags=["resource_types"])
api_router.include_router(
    cities.router, prefix="/cities", tags=["cities"])
api_router.include_router(
    resources.router, prefix="/resources", tags=["resources"])
