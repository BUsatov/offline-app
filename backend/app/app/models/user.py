from typing import Optional
from datetime import datetime
from pydantic import Schema, BaseModel, validator, EmailStr, SecretStr, Required

from app.models.city import CityInDB


# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

    class Config:
        orm_mode = True


# Properties to receive via API on creation
class UserCreate(UserBase):
    email: EmailStr
    password: str = Schema(
        ...,
        min_length=8
    )
    city: str = Schema(Required)


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None


class UserBaseInDB(UserBase):
    id: int = None
    created_at: datetime
    updated_at: datetime


# Additional properties to return via API
class User(UserBaseInDB):
    city: CityInDB
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False


# Additional properties stored in DB
class UserInDB(UserBaseInDB):
    hashed_password: str
