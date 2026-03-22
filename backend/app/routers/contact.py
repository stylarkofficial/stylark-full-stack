from fastapi import APIRouter, HTTPException, Request, status, BackgroundTasks
from typing import List, Optional
import logging
import time

from ..schemas import ContactFormRequest, ContactFormResponse, ContactSubmissionDetail
from ..email_service import send_both_emails

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["Contact"])


async def process_emails_in_background(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int,
) -> None:
    try:
        results = await send_both_emails(
            client_name=client_name,
            client_email=client_email,
            project_type=project_type,
            message=message,
            submission_id=submission_id,
        )

        logger.info(
            "Email task completed for inquiry %s | client=%s | company=%s",
            submission_id,
            "sent" if results["client_email"]["sent"] else f"failed ({results['client_email']['error']})",
            "sent" if results["company_email"]["sent"] else f"failed ({results['company_email']['error']})",
        )
    except Exception as exc:
        logger.error("Email background task error for inquiry %s: %s", submission_id, str(exc))


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
):
    try:
        ip_address = request.client.host if request.client else "unknown"
        submission_id = int(time.time() * 1000)

        logger.info(
            "New inquiry %s from %s <%s> | project_type=%s | ip=%s",
            submission_id,
            contact.name,
            contact.email,
            contact.project_type.value,
            ip_address,
        )

        background_tasks.add_task(
            process_emails_in_background,
            client_name=contact.name,
            client_email=contact.email,
            project_type=contact.project_type.value,
            message=contact.message,
            submission_id=submission_id,
        )

        return ContactFormResponse(
            success=True,
            message="Thank you for your inquiry. We've received your message and will get back to you within 24 hours. Please check your email for confirmation.",
            submission_id=submission_id,
        )
    except Exception as exc:
        logger.error("Form submission error: %s", str(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred. Please try again later.",
        )


@router.get(
    "/submissions",
    response_model=List[ContactSubmissionDetail],
    summary="Get All Submissions",
)
async def get_submissions(skip: int = 0, limit: int = 100, status: Optional[str] = None):
    raise HTTPException(
        status_code=status.HTTP_410_GONE,
        detail="Stored submissions are disabled. Stylark currently uses direct email delivery only.",
    )


@router.get(
    "/submissions/{submission_id}",
    response_model=ContactSubmissionDetail,
    summary="Get Submission by ID",
)
async def get_submission(submission_id: int):
    raise HTTPException(
        status_code=status.HTTP_410_GONE,
        detail="Stored submissions are disabled. Stylark currently uses direct email delivery only.",
    )
