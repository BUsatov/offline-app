from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Event(Base):
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now())
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
