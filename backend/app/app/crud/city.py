from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.city import City
from app.models.city import CityCreate


def get(db_session: Session, *, id: int) -> Optional[City]:
    return db_session.query(City).filter(City.id == id).first()


def get_multi(db_session: Session, *, skip=0, limit=100) -> List[Optional[City]]:
    return db_session.query(City).offset(skip).limit(limit).all()


def create(db_session: Session, *, city_in: CityCreate) -> City:
    city_in_data = jsonable_encoder(city_in)
    city = City(**city_in_data)
    db_session.add(city)
    db_session.commit()
    db_session.refresh(city)
    return city
