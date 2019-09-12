from pydantic import BaseModel


# Shared properties
class CategoryBase(BaseModel):
    name: str = None

    class Config:
        orm_mode = True


# Properties to receive on item creation
class CategoryCreate(CategoryBase):
    pass


# Properties to receive on item update
class CategoryUpdate(CategoryBase):
    pass


# Properties shared by models stored in DB
class CategoryInDBBase(CategoryBase):
    id: int
    name: str


# Properties to return to client
class Category(CategoryInDBBase):
    pass


# Properties stored in DB
class CategoryInDB(CategoryInDBBase):
    pass
