from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.resource import Resource
from app.db_models.event import Event
from app.db_models.city import City
from app.db_models.resource_type import ResourceType
from app.db_models.category import Category
from app.models.event import EventCreate


def get(db_session: Session, *, id: int) -> Optional[Event]:
    return db_session.query(Event).filter(Event.id == id).first()


def get_multi(db_session: Session, *, skip=0, limit=100, filter_by) -> List[Optional[Event]]:
    filters = {k: v for k, v in filter_by.items() if v is not None}
    events = db_session.query(Event).filter_by(
        **filters).offset(skip).limit(limit).all()
    return events


def get_multi_by_owner(
    db_session: Session, *, owner_id: int, skip=0, limit=100
) -> List[Optional[Event]]:
    return (
        db_session.query(Event)
        .filter(Event.owner_id == owner_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create(db_session: Session, *, event_in: EventCreate, owner_id: int) -> Event:
    event_in_data = jsonable_encoder(event_in)
    category = db_session.query(Category).filter(
        Category.name == event_in_data['category']['name']).first()
    user_in_city = user_in.city.lower().strip()
    city = db_session.query(City).filter_by(name=user_in_city).first()
    if not city:
        city = City(name=user_in_city)
        db_session.add(city)
        db_session.commit()
        db_session.refresh(city)

    event = Event(
        name=event_in.name,
        city_id=city.id,
        description=event_in.description,
        owner_id=owner_id,
        category_id=category.id
    )
    db_session.add(event)
    db_session.commit()
    resources = []
    for resource in event_in_data['resources']:
        resource_in_db = Resource(**resource, event_id=event.id)
        db_session.add(resource_in_db)
        resources.append(resource_in_db)
    db_session.commit()
    db_session.refresh(event)
    return event


def remove(db_session: Session, *, id: int):
    event = db_session.query(Event).filter(Event.id == id).first()
    db_session.delete(event)
    db_session.commit()
    return event
