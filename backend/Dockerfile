FROM python:3.10

WORKDIR /app

RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root


COPY . .
EXPOSE 8000

ENV DJANGO_SETTINGS_MODULE=core.settings
ENV PYTHONPATH=/app
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
