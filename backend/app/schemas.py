from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict
from typing import Optional
from datetime import datetime
from enum import Enum


class ProjectTypeEnum(str, Enum):
    """Project type options matching frontend."""
    WEBSITE = "website"
    ECOMMERCE = "ecommerce"
    AI = "ai"
    ENTERPRISE = "enterprise"
    BRAND = "brand"
    OTHER = "other"


class ContactStatusEnum(str, Enum):
    """Legacy contact submission status values."""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    CONTACTED = "contacted"
    COMPLETED = "completed"
    ARCHIVED = "archived"


class ContactFormRequest(BaseModel):
    """Schema for contact form submission from frontend."""
    name: str = Field(..., min_length=2, max_length=255, description="Client's full name")
    email: EmailStr = Field(..., description="Client's email address")
    project_type: ProjectTypeEnum = Field(..., description="Type of project")
    message: str = Field(..., min_length=10, max_length=5000, description="Project details and message")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "project_type": "website",
                "message": "I'm interested in building a custom website for my business.",
            }
        }
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Name cannot be empty")
        return value

    @field_validator("message")
    @classmethod
    def validate_message(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 10:
            raise ValueError("Message must be at least 10 characters")
        return value


class ContactFormResponse(BaseModel):
    """Response after successful contact form submission."""
    success: bool
    message: str
    submission_id: int

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Thank you for your inquiry!",
                "submission_id": 20260322001,
            }
        }
    )


class ContactSubmissionDetail(BaseModel):
    """Legacy schema kept only for compatibility in docs."""
    id: int
    name: str
    email: str
    project_type: str
    message: str
    status: str
    company_email_sent: bool
    client_email_sent: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HealthCheckResponse(BaseModel):
    """Health check response."""
    status: str
    message: str
    timestamp: datetime
    database: str
    email_service: str


class ErrorResponse(BaseModel):
    """Standard error response."""
    success: bool = False
    error: str
    detail: Optional[str] = None
