from pydantic import BaseModel


# Shared properties
class CityBase(BaseModel):
    name: str = None

    class Config:
        orm_mode = True


# Properties to receive on item creation
class CityCreate(CityBase):
    pass


# Properties to receive on item update
class CityUpdate(CityBase):
    pass


# Properties shared by models stored in DB
class CityInDBBase(CityBase):
    id: int
    name: str


# Properties to return to client
class City(CityInDBBase):
    pass


# Properties stored in DB
class CityInDB(CityInDBBase):
    pass
