FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

RUN pip install celery~=4.3 passlib[bcrypt] tenacity requests emails "fastapi>=0.38.1" uvicorn gunicorn pyjwt python-multipart email_validator jinja2 psycopg2-binary alembic SQLAlchemy ptvsd remote-pdb

# For development, Jupyter remote kernel, Hydrogen
# Using inside the container:
# jupyter lab --ip=0.0.0.0 --allow-root --NotebookApp.custom_display_url=http://127.0.0.1:8888
ARG env=prod
RUN bash -c "if [ $env == 'dev' ] ; then pip install jupyterlab ; fi"
EXPOSE 8888

COPY ./app /app
WORKDIR /app/

ENV PYTHONPATH=/app
ENV PTVSD_DEBUG 1

EXPOSE 80
