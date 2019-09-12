# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.db_models.user import User  # noqa
from app.db_models.event import Event  # noqa
from app.db_models.item import Item  # noqa
from app.db_models.category import Category  # noqa
from app.db_models.resource import Resource  # noqa
from app.db_models.resource_type import ResourceType  # noqa
from app.db_models.city import City  # noqa
