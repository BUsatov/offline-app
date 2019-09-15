from pydantic import BaseModel
from datetime import datetime


# Shared properties
class ResourceTypeBase(BaseModel):
    name: str = None

    class Config:
        orm_mode = True


# Properties to receive on item creation
class ResourceTypeCreate(ResourceTypeBase):
    pass


# Properties shared by models stored in DB
class ResourceTypeInDBBase(ResourceTypeBase):
    id: int
    created_at: datetime
    updated_at: datetime
    name: str


# Properties to return to client
class ResourceType(ResourceTypeInDBBase):
    pass
