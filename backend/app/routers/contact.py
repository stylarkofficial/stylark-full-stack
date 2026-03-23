from fastapi import APIRouter, HTTPException, Request, status
from typing import List, Optional
import logging
import time

from ..schemas import ContactFormRequest, ContactFormResponse, ContactSubmissionDetail
from ..email_service import send_both_emails, is_email_configured

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post(
    "/submit",
    response_model=ContactFormResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Form",
)
async def submit_contact_form(
    contact: ContactFormRequest,
    request: Request,
):
    try:
        if not is_email_configured():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Email service is not configured on the server.",
            )

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

        results = await send_both_emails(
            client_name=contact.name,
            client_email=contact.email,
            project_type=contact.project_type.value,
            message=contact.message,
            submission_id=submission_id,
        )

        company_sent = results["company_email"]["sent"]
        client_sent = results["client_email"]["sent"]

        if not company_sent or not client_sent:
            logger.error(
                "Inquiry %s email failure | company=%s (%s) | client=%s (%s)",
                submission_id,
                company_sent,
                results["company_email"]["error"],
                client_sent,
                results["client_email"]["error"],
            )
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="We could not send the inquiry emails. Please try again in a moment.",
            )

        return ContactFormResponse(
            success=True,
            message="Thank you for your inquiry. We've received your message and sent confirmation to your email.",
            submission_id=submission_id,
        )
    except HTTPException:
        raise
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
