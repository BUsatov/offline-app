from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.db_models.category import Category
from app.models.category import CategoryCreate


def get(db_session: Session, *, id: int) -> Optional[Category]:
    return db_session.query(Category).filter(Category.id == id).first()


def get_multi(db_session: Session, *, skip=0, limit=100) -> List[Optional[Category]]:
    return db_session.query(Category).offset(skip).limit(limit).all()


def create(db_session: Session, *, category_in: CategoryCreate) -> Category:
    category_in_data = jsonable_encoder(category_in)
    category = Category(**category_in_data)
    db_session.add(category)
    db_session.commit()
    db_session.refresh(category)
    return category
