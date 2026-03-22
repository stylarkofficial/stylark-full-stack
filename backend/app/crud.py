"""
══════════════════════════════════════════════
STYLARKX — CRUD OPERATIONS
══════════════════════════════════════════════
"""

from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional, List

from . import models, schemas


# ══════════════════════════════════════════════
# CONTACT SUBMISSION CRUD
# ══════════════════════════════════════════════

def create_contact_submission(
    db: Session,
    contact: schemas.ContactFormRequest,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
) -> models.ContactSubmission:
    """
    Create a new contact form submission.
    """
    db_submission = models.ContactSubmission(
        name=contact.name,
        email=contact.email,
        project_type=contact.project_type.value,
        message=contact.message,
        ip_address=ip_address,
        user_agent=user_agent,
        status="new"
    )
    
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    
    return db_submission


def get_contact_submission(
    db: Session,
    submission_id: int
) -> Optional[models.ContactSubmission]:
    """
    Get a contact submission by ID.
    """
    return db.query(models.ContactSubmission).filter(
        models.ContactSubmission.id == submission_id
    ).first()


def get_contact_submissions(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None
) -> List[models.ContactSubmission]:
    """
    Get all contact submissions with optional filtering.
    """
    query = db.query(models.ContactSubmission)
    
    if status:
        query = query.filter(models.ContactSubmission.status == status)
    
    return query.order_by(
        desc(models.ContactSubmission.created_at)
    ).offset(skip).limit(limit).all()


def update_email_status(
    db: Session,
    submission_id: int,
    company_email_sent: Optional[bool] = None,
    client_email_sent: Optional[bool] = None
) -> Optional[models.ContactSubmission]:
    """
    Update email sent status for a submission.
    """
    submission = get_contact_submission(db, submission_id)
    
    if submission:
        if company_email_sent is not None:
            submission.company_email_sent = company_email_sent
        if client_email_sent is not None:
            submission.client_email_sent = client_email_sent
        
        db.commit()
        db.refresh(submission)
    
    return submission


def update_submission_status(
    db: Session,
    submission_id: int,
    status: str
) -> Optional[models.ContactSubmission]:
    """
    Update the status of a contact submission.
    """
    submission = get_contact_submission(db, submission_id)
    
    if submission:
        submission.status = status
        db.commit()
        db.refresh(submission)
    
    return submission


# ══════════════════════════════════════════════
# EMAIL LOG CRUD
# ══════════════════════════════════════════════

def create_email_log(
    db: Session,
    recipient_email: str,
    recipient_name: Optional[str],
    subject: str,
    email_type: str,
    sent_successfully: bool,
    error_message: Optional[str] = None,
    contact_submission_id: Optional[int] = None
) -> models.EmailLog:
    """
    Log an email send attempt.
    """
    db_log = models.EmailLog(
        recipient_email=recipient_email,
        recipient_name=recipient_name,
        subject=subject,
        email_type=email_type,
        sent_successfully=sent_successfully,
        error_message=error_message,
        contact_submission_id=contact_submission_id
    )
    
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    
    return db_log


def get_email_logs_for_submission(
    db: Session,
    submission_id: int
) -> List[models.EmailLog]:
    """
    Get all email logs for a specific submission.
    """
    return db.query(models.EmailLog).filter(
        models.EmailLog.contact_submission_id == submission_id
    ).order_by(desc(models.EmailLog.created_at)).all()
