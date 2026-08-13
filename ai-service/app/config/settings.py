from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    GROQ_API_KEY: str

    MONGODB_URI: str
    DATABASE_NAME: str

    AI_SERVICE_PORT: int = 8000

    CLIENT_URL: str = "http://localhost:3000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()