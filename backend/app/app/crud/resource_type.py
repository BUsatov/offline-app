from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.resource_type import ResourceType
from app.models.resource_type import ResourceTypeCreate


def get(db_session: Session, *, id: int) -> Optional[ResourceType]:
    return db_session.query(ResourceType).filter(ResourceType.id == id).first()


def get_multi(db_session: Session, *, skip=0, limit=100) -> List[Optional[ResourceType]]:
    return db_session.query(ResourceType).offset(skip).limit(limit).all()


def create(db_session: Session, *, resource_type_in: ResourceTypeCreate) -> ResourceType:
    resource_type_in_data = jsonable_encoder(resource_type_in)
    resource_type = ResourceType(**resource_type_in_data)
    db_session.add(resource_type)
    db_session.commit()
    db_session.refresh(resource_type)
    return resource_type
