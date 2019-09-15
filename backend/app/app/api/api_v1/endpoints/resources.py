from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.api.utils.db import get_db
from app.api.utils.security import get_current_active_user
from app.db_models.user import User as DBUser
from app.models.resource import Resource

router = APIRouter()


@router.patch("/{id}/assign", response_model=Resource)
def assign_user_to_resource(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: DBUser = Depends(get_current_active_user),
):
    """
    Assign current user to the resource.
    """

    resource = crud.resource.get(db, id=id)
    if not resource:
        raise HTTPException(status_code=404, detail="Item not found")
    if resource.assignee_id:
        raise HTTPException(
            status_code=400, detail="Resource already has assigned user")
    if crud.user.participate_in_event(db, current_user, resource.event_id):
        raise HTTPException(
            status_code=400, detail="You are already assigned to the other resource in this event")
    resource = crud.resource.assign_user(
        db, resource=resource, user_id=current_user.id)

    return resource
