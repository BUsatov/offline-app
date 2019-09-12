from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class City(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True, nullable=False)
    users = relationship("User", back_populates="city")
    events = relationship("Event", back_populates="city")
