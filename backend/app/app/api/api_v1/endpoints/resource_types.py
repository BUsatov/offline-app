from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.api.utils.db import get_db
from app.api.utils.security import get_current_active_user
from app.db_models.user import User as DBUser
from app.models.resource_type import ResourceType

router = APIRouter()


@router.get("/", response_model=List[ResourceType])
def read_resource_types(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: DBUser = Depends(get_current_active_user),
):
    """
    Retrieve resource types.
    """

    resource_types = crud.resource_type.get_multi(db, skip=skip, limit=limit)
    return resource_types
