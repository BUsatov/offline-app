from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Event(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    city = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="events")
    category_id = Column(Integer, ForeignKey("category.id"))
    category = relationship("Category", back_populates="events")
    resources = relationship("Resource", back_populates="event")
    city_id = Column(Integer, ForeignKey("city.id"))
    city = relationship("City", back_populates="events")
