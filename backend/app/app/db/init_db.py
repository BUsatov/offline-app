from app import crud
from app.core import config
from app.models.user import UserCreate
from app.models.category import CategoryCreate
from app.models.resource_type import ResourceTypeCreate

# make sure all SQL Alchemy models are imported before initializing DB
# otherwise, SQL Alchemy might fail to initialize properly relationships
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28
from app.db import base


def init_db(db_session):
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    user = crud.user.get_by_email(db_session, email=config.FIRST_SUPERUSER)
    if not user:
        user_in = UserCreate(
            email=config.FIRST_SUPERUSER,
            password=config.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.user.create(db_session, user_in=user_in)
    categories = crud.category.get_multi(db_session)
    if not len(categories):
        for cat in ['cooking', 'handcrafting', 'sport', 'wellness', 'gardening', 'fixing', 'arts', 'parenting']:
            category_in = CategoryCreate(name=cat)
            crud.category.create(db_session, category_in=category_in)
    resource_types = crud.resource_type.get_multi(db_session)
    if not len(resource_types):
        for res_type in ['skills', 'materials', 'location', 'services', 'other']:
            resource_type_in = ResourceTypeCreate(name=res_type)
            crud.resource_type.create(
                db_session, resource_type_in=resource_type_in)
