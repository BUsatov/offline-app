from typing import List
from pydantic import BaseModel
from pydantic.dataclasses import dataclass
from app.models.category import CategoryBase, CategoryInDB
from app.models.resource import ResourceBase, ResourceInDB
from app.models.city import CityInDB

# Shared properties


class EventBase(BaseModel):
    name: str = None
    description: str

    class Config:
        orm_mode = True


# Properties to receive on item creation
class EventCreate(EventBase):
    category: CategoryBase
    resources: List[ResourceBase] = []
    city: str


# Properties to receive on item update
class EventUpdate(EventBase):
    pass


# Properties shared by models stored in DB
class EventInDBBase(EventBase):
    id: int
    name: str
    description: str
    city: str
    owner_id: int


class Event(EventInDBBase):
    category: CategoryInDB
    resources: List[ResourceInDB]
    city: CityInDB


# Properties stored in DB
class EventInDB(EventInDBBase):
    pass
