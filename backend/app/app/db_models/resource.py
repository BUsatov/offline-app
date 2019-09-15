from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class Resource(Base):
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now())
    value = Column(String, index=True)
    resource_type_id = Column(Integer, ForeignKey("resourcetype.id"))
    resource_type = relationship("ResourceType", back_populates="resources")
    event_id = Column(Integer, ForeignKey("event.id"))
    event = relationship("Event", back_populates="resources")
    assignee_id = Column(Integer, ForeignKey("user.id"))
    assignee = relationship("User", back_populates="resources")
