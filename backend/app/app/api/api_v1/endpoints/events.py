from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.api.utils.db import get_db
from app.api.utils.security import get_current_active_user
from app.db_models.user import User as DBUser
from app.models.event import Event, EventCreate

router = APIRouter()


@router.get("/", response_model=List[Event])
def read_items(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    city_id: int = None,
    category_id: int = None,
    current_user: DBUser = Depends(get_current_active_user),
):
    """
    Retrieve events.
    """

    events = crud.event.get_multi(db, skip=skip, limit=limit, filter_by={
                                  'city_id': city_id, 'category_id': category_id})
    return events


@router.post("/", response_model=Event)
def create_event(
    *,
    db: Session = Depends(get_db),
    event_in: EventCreate,
    current_user: DBUser = Depends(get_current_active_user),
):
    """
    Create new event.
    """
    event = crud.event.create(
        db_session=db, event_in=event_in, owner_id=current_user.id)
    return event
