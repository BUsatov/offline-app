"""remove primary column from city name

Revision ID: 731bd1e4bf5d
Revises: 11c0c81bdf41
Create Date: 2019-09-12 17:02:49.403866

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '731bd1e4bf5d'
down_revision = '11c0c81bdf41'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('city', 'name',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('city', 'name',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###
