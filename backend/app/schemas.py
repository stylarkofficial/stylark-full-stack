"""
══════════════════════════════════════════════
STYLARKX — PYDANTIC SCHEMAS
══════════════════════════════════════════════
"""

from pydantic import BaseModel, EmailStr, Field, field_validator
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
    """Contact submission status."""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    CONTACTED = "contacted"
    COMPLETED = "completed"
    ARCHIVED = "archived"


# ══════════════════════════════════════════════
# REQUEST SCHEMAS
# ══════════════════════════════════════════════

class ContactFormRequest(BaseModel):
    """
    Schema for contact form submission from frontend.
    """
    name: str = Field(
        ...,
        min_length=2,
        max_length=255,
        description="Client's full name"
    )
    email: EmailStr = Field(
        ...,
        description="Client's email address"
    )
    project_type: ProjectTypeEnum = Field(
        ...,
        description="Type of project"
    )
    message: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="Project details and message"
    )
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        """Clean and validate name."""
        v = v.strip()
        if not v:
            raise ValueError('Name cannot be empty')
        return v
    
    @field_validator('message')
    @classmethod
    def validate_message(cls, v: str) -> str:
        """Clean and validate message."""
        v = v.strip()
        if len(v) < 10:
            raise ValueError('Message must be at least 10 characters')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "project_type": "website",
                "message": "I'm interested in building a custom website for my business."
            }
        }


# ══════════════════════════════════════════════
# RESPONSE SCHEMAS
# ══════════════════════════════════════════════

class ContactFormResponse(BaseModel):
    """
    Response after successful contact form submission.
    """
    success: bool
    message: str
    submission_id: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Thank you for your inquiry!",
                "submission_id": 1
            }
        }


class ContactSubmissionDetail(BaseModel):
    """
    Detailed contact submission data.
    """
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
    
    class Config:
        from_attributes = True


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
