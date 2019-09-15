from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.resource import Resource
from app.models.resource import ResourceCreate


def get(db_session: Session, *, id: int) -> Optional[Resource]:
    return db_session.query(Resource).filter(Resource.id == id).first()


def get_multi_by_event(db_session: Session, *, event_id, skip=0, limit=100) -> List[Optional[Resource]]:
    return db_session.query(Resource).filter(Resource.event_id == event_id).offset(skip).limit(limit).all()


def assign_user(db_session: Session, *, resource: Resource, user_id: int) -> Resource:
    setattr(resource, 'assignee_id', user_id)
    db_session.add(resource)
    db_session.commit()
    db_session.refresh(resource)
    return resource
