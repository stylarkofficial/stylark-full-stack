"""
══════════════════════════════════════════════
STYLARKX — CONFIGURATION
══════════════════════════════════════════════
"""

from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Database
    DATABASE_URL: Optional[str] = None
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = ""
    DB_NAME: str = "stylarkx_db"

    # Email
    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = ""
    MAIL_PORT: int = 587
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_FROM_NAME: str = "StylarkX"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    # Company
    COMPANY_EMAIL: str = "hello@stylarkx.com"

    # Frontend
    FRONTEND_URL: str = "http://localhost:5173"
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    CORS_ALLOW_ORIGIN_REGEX: str = r"^https:\/\/.*\.vercel\.app$"

    # Environment
    ENVIRONMENT: str = "development"
    PORT: int = 8000

    @property
    def sqlalchemy_database_url(self) -> str:
        """
        Build SQLAlchemy database URL.

        Priority:
        1) DATABASE_URL (for Neon/Render production)
        2) Legacy MySQL fields (for local compatibility)
        """
        if self.DATABASE_URL:
            url = self.DATABASE_URL.strip()
            # Render/Neon commonly provide postgres:// URLs
            if url.startswith("postgres://"):
                return url.replace("postgres://", "postgresql+psycopg://", 1)
            if url.startswith("postgresql://"):
                return url.replace("postgresql://", "postgresql+psycopg://", 1)
            return url

        return (
            f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

    @property
    def cors_origins(self) -> list[str]:
        """Parse CORS origins from env string."""
        origins = [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]
        if self.FRONTEND_URL and self.FRONTEND_URL not in origins:
            origins.append(self.FRONTEND_URL)
        return origins

    @property
    def MAIL_FROM_ADDRESS(self) -> str:
        """Get mail from address."""
        return self.MAIL_FROM or self.MAIL_USERNAME

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "allow"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
