"""Add city table, add sity to the user and event

Revision ID: 484242ef1abe
Revises: 91a0ff3b4311
Create Date: 2019-09-12 07:57:40.388010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '484242ef1abe'
down_revision = '91a0ff3b4311'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('city',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_city_id'), 'city', ['id'], unique=False)
    op.create_index(op.f('ix_city_name'), 'city', ['name'], unique=False)
    op.add_column('event', sa.Column('city_id', sa.Integer(), nullable=True))
    op.drop_index('ix_event_city', table_name='event')
    op.create_foreign_key(None, 'event', 'city', ['city_id'], ['id'])
    op.drop_column('event', 'city')
    op.add_column('user', sa.Column('city_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user', 'city', ['city_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'city_id')
    op.add_column('event', sa.Column('city', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'event', type_='foreignkey')
    op.create_index('ix_event_city', 'event', ['city'], unique=False)
    op.drop_column('event', 'city_id')
    op.drop_index(op.f('ix_city_name'), table_name='city')
    op.drop_index(op.f('ix_city_id'), table_name='city')
    op.drop_table('city')
    # ### end Alembic commands ###
