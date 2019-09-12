from pydantic import BaseModel


# Shared properties
class ResourceBase(BaseModel):
    value: str = None
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
    value: str
    resource_type_id: int
    event_id: int


# Properties to return to client
class Resource(ResourceInDBBase):
    pass


# Properties stored in DB
class ResourceInDB(ResourceInDBBase):
    pass
