from pydantic import BaseModel
from datetime import datetime
from app.models.user import UserInDB
# Shared properties


class ResourceBase(BaseModel):
    value: str
    resource_type_id: int

    class Config:
        orm_mode = True


# Properties to receive on item creation
class ResourceCreate(ResourceBase):
    pass


# Properties to receive on item update
class ResourceUpdate(ResourceBase):
    pass


# Properties shared by models stored in DB
class ResourceInDBBase(ResourceBase):
    id: int
    created_at: datetime
    updated_at: datetime
    value: str
    resource_type_id: int
    event_id: int
    assignee: UserInDB = None


# Properties to return to client
class Resource(ResourceInDBBase):
    pass


# Properties stored in DB
class ResourceInDB(ResourceInDBBase):
    pass
