"""add createat/updatedat to all tables

Revision ID: a0cf795a9bbe
Revises: b198a5f3a2c5
Create Date: 2019-09-14 15:36:29.727709

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0cf795a9bbe'
down_revision = 'b198a5f3a2c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('category', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('category', sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.drop_index('ix_category_name', table_name='category')
    op.create_index(op.f('ix_category_name'), 'category', ['name'], unique=True)
    op.add_column('city', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('city', sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.drop_index('ix_city_name', table_name='city')
    op.create_index(op.f('ix_city_name'), 'city', ['name'], unique=True)
    op.add_column('event', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('event', sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('resource', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('resource', sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('resourcetype', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('resourcetype', sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.drop_index('ix_resourcetype_name', table_name='resourcetype')
    op.create_index(op.f('ix_resourcetype_name'), 'resourcetype', ['name'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_resourcetype_name'), table_name='resourcetype')
    op.create_index('ix_resourcetype_name', 'resourcetype', ['name'], unique=False)
    op.drop_column('resourcetype', 'updated_at')
    op.drop_column('resourcetype', 'created_at')
    op.drop_column('resource', 'updated_at')
    op.drop_column('resource', 'created_at')
    op.drop_column('event', 'updated_at')
    op.drop_column('event', 'created_at')
    op.drop_index(op.f('ix_city_name'), table_name='city')
    op.create_index('ix_city_name', 'city', ['name'], unique=False)
    op.drop_column('city', 'updated_at')
    op.drop_column('city', 'created_at')
    op.drop_index(op.f('ix_category_name'), table_name='category')
    op.create_index('ix_category_name', 'category', ['name'], unique=False)
    op.drop_column('category', 'updated_at')
    op.drop_column('category', 'created_at')
    # ### end Alembic commands ###