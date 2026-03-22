"""
══════════════════════════════════════════════
STYLARKX — CONTACT API ROUTER
══════════════════════════════════════════════
"""

from fastapi import APIRouter, Depends, HTTPException, Request, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from ..database import get_db, SessionLocal
from ..schemas import (
    ContactFormRequest,
    ContactFormResponse,
    ContactSubmissionDetail,
)
from .. import crud
from ..email_service import send_both_emails

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/contact",
    tags=["Contact"],
)


async def process_emails_in_background(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int
) -> None:
    """
    Background task to send emails without blocking the response.
    """
    try:
        # Send both emails
        results = await send_both_emails(
            client_name=client_name,
            client_email=client_email,
            project_type=project_type,
            message=message,
            submission_id=submission_id
        )
        
        # Update database with email status
        db = SessionLocal()
        try:
            crud.update_email_status(
                db=db,
                submission_id=submission_id,
                company_email_sent=results["company_email"]["sent"],
                client_email_sent=results["client_email"]["sent"]
            )
            
            # Log results
            for email_type, result in results.items():
                crud.create_email_log(
                    db=db,
                    recipient_email=result["recipient"],
                    recipient_name=client_name if email_type == "client_email" else "StylarkX Team",
                    subject=f"Contact Form - {email_type}",
                    email_type=email_type,
                    sent_successfully=result["sent"],
                    error_message=result["error"],
                    contact_submission_id=submission_id
                )
                
            logger.info(f"✅ Email task completed for submission #{submission_id}")
            logger.info(f"   → Client email ({client_email}): {'✓ Sent' if results['client_email']['sent'] else '✗ Failed'}")
            logger.info(f"   → Company email: {'✓ Sent' if results['company_email']['sent'] else '✗ Failed'}")
            
        finally:
            db.close()
            
    except Exception as e:
        logger.error(f"❌ Email background task error: {str(e)}")


@router.post(
    "/submit",
    response_model=ContactFormResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Form",
)
async def submit_contact_form(
    contact: ContactFormRequest,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Handle contact form submission.
    
    1. Saves submission to database
    2. Sends thank you email to CLIENT
    3. Sends notification email to COMPANY
    """
    try:
        # Get client metadata
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        
        # Save to database
        submission = crud.create_contact_submission(
            db=db,
            contact=contact,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        logger.info(f"✅ New submission #{submission.id} from {contact.name} ({contact.email})")
        
        # Send emails in background (non-blocking)
        background_tasks.add_task(
            process_emails_in_background,
            client_name=contact.name,
            client_email=contact.email,
            project_type=contact.project_type.value,
            message=contact.message,
            submission_id=submission.id
        )
        
        return ContactFormResponse(
            success=True,
            message="Thank you for your inquiry! We've received your message and will get back to you within 24 hours. Please check your email for confirmation.",
            submission_id=submission.id
        )
        
    except Exception as e:
        logger.error(f"❌ Form submission error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred. Please try again later."
        )


@router.get(
    "/submissions",
    response_model=List[ContactSubmissionDetail],
    summary="Get All Submissions",
)
async def get_submissions(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Get all contact submissions (admin endpoint)."""
    return crud.get_contact_submissions(db=db, skip=skip, limit=limit, status=status)


@router.get(
    "/submissions/{submission_id}",
    response_model=ContactSubmissionDetail,
    summary="Get Submission by ID",
)
async def get_submission(
    submission_id: int,
    db: Session = Depends(get_db),
):
    """Get a specific submission by ID."""
    submission = crud.get_contact_submission(db=db, submission_id=submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission
