from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Resource(Base):
    id = Column(Integer, primary_key=True, index=True)
    value = Column(String, index=True)
    resource_type_id = Column(Integer, ForeignKey("resourcetype.id"))
    resource_type = relationship("ResourceType", back_populates="resources")
    event_id = Column(Integer, ForeignKey("event.id"))
    event = relationship("Event", back_populates="resources")
