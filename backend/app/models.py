"""
══════════════════════════════════════════════
STYLARKX — DATABASE MODELS
══════════════════════════════════════════════
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from .database import Base


class ContactSubmission(Base):
    """
    Contact form submission model.
    Stores all inquiries from the website.
    """
    __tablename__ = "contact_submissions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Client Information
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, index=True)
    project_type = Column(String(50), nullable=False, default="other")
    message = Column(Text, nullable=False)
    
    # Metadata
    status = Column(String(50), nullable=False, default="new")
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    
    # Email Status
    company_email_sent = Column(Boolean, default=False)
    client_email_sent = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
    
    def __repr__(self) -> str:
        return f"<ContactSubmission(id={self.id}, name='{self.name}', email='{self.email}')>"


class EmailLog(Base):
    """
    Email log model.
    Tracks all emails sent from the system.
    """
    __tablename__ = "email_logs"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Email Details
    recipient_email = Column(String(255), nullable=False, index=True)
    recipient_name = Column(String(255), nullable=True)
    subject = Column(String(500), nullable=False)
    email_type = Column(String(50), nullable=False)
    
    # Status
    sent_successfully = Column(Boolean, default=False)
    error_message = Column(Text, nullable=True)
    
    # Reference
    contact_submission_id = Column(Integer, nullable=True, index=True)
    
    # Timestamps
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    
    def __repr__(self) -> str:
        return f"<EmailLog(id={self.id}, recipient='{self.recipient_email}', type='{self.email_type}')>"
