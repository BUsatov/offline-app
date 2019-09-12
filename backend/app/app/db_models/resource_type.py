from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class ResourceType(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    resources = relationship("Resource", back_populates="resource_type")
