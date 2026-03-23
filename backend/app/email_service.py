import asyncio
import logging
import smtplib
import ssl
from email.message import EmailMessage
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

from jinja2 import Environment, FileSystemLoader

from .config import settings

logger = logging.getLogger(__name__)

template_dir = Path(__file__).parent.parent / "templates"
jinja_env = Environment(loader=FileSystemLoader(str(template_dir)))


def get_project_type_display(project_type: str) -> str:
    mapping = {
        "website": "Custom Website Development",
        "ecommerce": "eCommerce Platform",
        "ai": "AI & ML Integration",
        "enterprise": "Enterprise Platform",
        "brand": "Portfolio & Brand System",
        "other": "Other Project",
    }
    return mapping.get(project_type, project_type.title())


def is_email_configured() -> bool:
    return bool(
        settings.MAIL_USERNAME
        and settings.MAIL_PASSWORD
        and settings.MAIL_SERVER
        and settings.MAIL_PORT
        and settings.COMPANY_EMAIL
    )


def _deliver_message(message: EmailMessage) -> None:
    context = ssl.create_default_context()

    if settings.MAIL_SSL_TLS:
        with smtplib.SMTP_SSL(settings.MAIL_SERVER, settings.MAIL_PORT, timeout=12, context=context) as server:
            server.ehlo()
            if settings.USE_CREDENTIALS:
                server.login(settings.MAIL_USERNAME, settings.MAIL_PASSWORD)
            server.send_message(message)
        return

    with smtplib.SMTP(settings.MAIL_SERVER, settings.MAIL_PORT, timeout=12) as server:
        server.ehlo()
        if settings.MAIL_STARTTLS:
            server.starttls(context=context)
            server.ehlo()
        if settings.USE_CREDENTIALS:
            server.login(settings.MAIL_USERNAME, settings.MAIL_PASSWORD)
        server.send_message(message)


async def _send_html_email(
    *,
    subject: str,
    recipient: str,
    html_content: str,
    reply_to: Optional[str] = None,
) -> Tuple[bool, Optional[str]]:
    if not is_email_configured():
        logger.warning("Email not configured - skipping email to %s", recipient)
        return False, "Email service not configured"

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{settings.MAIL_FROM_NAME} <{settings.MAIL_FROM_ADDRESS}>"
    message["To"] = recipient
    if reply_to:
        message["Reply-To"] = reply_to

    message.set_content("This email contains HTML content. Please open it in an HTML-compatible email client.")
    message.add_alternative(html_content, subtype="html")

    try:
        await asyncio.wait_for(asyncio.to_thread(_deliver_message, message), timeout=15)
        logger.info("Email sent to %s", recipient)
        return True, None
    except Exception as exc:
        error_message = str(exc)
        logger.error("Failed to send email to %s: %s", recipient, error_message)
        return False, error_message


async def send_email_to_client(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int,
) -> Tuple[bool, Optional[str]]:
    template = jinja_env.get_template("email_to_client.html")
    html_content = template.render(
        name=client_name,
        project_type=get_project_type_display(project_type),
        message=message,
        submission_id=submission_id,
    )

    return await _send_html_email(
        subject="Thank You for Contacting StylarkX - We've Received Your Inquiry",
        recipient=client_email,
        html_content=html_content,
    )


async def send_email_to_company(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int,
) -> Tuple[bool, Optional[str]]:
    template = jinja_env.get_template("email_to_company.html")
    html_content = template.render(
        name=client_name,
        email=client_email,
        project_type=get_project_type_display(project_type),
        message=message,
        submission_id=submission_id,
    )

    return await _send_html_email(
        subject=f"New Project Inquiry from {client_name} - StylarkX",
        recipient=settings.COMPANY_EMAIL,
        html_content=html_content,
        reply_to=client_email,
    )


async def send_both_emails(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int,
) -> Dict[str, Any]:
    results = {
        "client_email": {"sent": False, "error": None, "recipient": client_email},
        "company_email": {"sent": False, "error": None, "recipient": settings.COMPANY_EMAIL},
    }

    company_success, company_error = await send_email_to_company(
        client_name=client_name,
        client_email=client_email,
        project_type=project_type,
        message=message,
        submission_id=submission_id,
    )
    results["company_email"].update({"sent": company_success, "error": company_error})

    client_success, client_error = await send_email_to_client(
        client_name=client_name,
        client_email=client_email,
        project_type=project_type,
        message=message,
        submission_id=submission_id,
    )
    results["client_email"].update({"sent": client_success, "error": client_error})

    return results
