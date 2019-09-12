from pydantic import BaseModel


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
    name: str


# Properties to return to client
class ResourceType(ResourceTypeInDBBase):
    pass
