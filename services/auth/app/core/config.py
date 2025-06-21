from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    JWT_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    ALGORITHM: str
    SQLALCHEMY_DATABASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()
