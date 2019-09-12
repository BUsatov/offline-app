from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.api.utils.db import get_db
from app.api.utils.security import get_current_active_user
from app.db_models.user import User as DBUser
from app.models.city import City

router = APIRouter()


@router.get("/", response_model=List[City])
def read_cities(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: DBUser = Depends(get_current_active_user),
):
    """
    Retrieve cities.
    """

    cities = crud.city.get_multi(db, skip=skip, limit=limit)
    return cities
