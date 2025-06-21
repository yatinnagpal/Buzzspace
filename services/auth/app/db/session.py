from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import Base

SQLALCHEMY_DATABASE_URL = "postgresql://yatinnagpal:postgres@localhost:5432/buzzauth"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

session = sessionmaker(bind=engine)

Base.metadata.create_all(bind=engine)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()