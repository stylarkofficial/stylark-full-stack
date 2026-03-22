from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from typing import Optional, Tuple, Dict, Any
import logging

from .config import settings

logger = logging.getLogger(__name__)

template_dir = Path(__file__).parent.parent / "templates"


def get_email_config() -> ConnectionConfig:
    return ConnectionConfig(
        MAIL_USERNAME=settings.MAIL_USERNAME,
        MAIL_PASSWORD=settings.MAIL_PASSWORD,
        MAIL_FROM=settings.MAIL_FROM or settings.MAIL_USERNAME,
        MAIL_PORT=settings.MAIL_PORT,
        MAIL_SERVER=settings.MAIL_SERVER,
        MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
        MAIL_STARTTLS=settings.MAIL_STARTTLS,
        MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
        USE_CREDENTIALS=settings.USE_CREDENTIALS,
        VALIDATE_CERTS=settings.VALIDATE_CERTS,
        TEMPLATE_FOLDER=template_dir,
    )


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
    return bool(settings.MAIL_USERNAME and settings.MAIL_PASSWORD and settings.COMPANY_EMAIL)


async def send_email_to_client(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int,
) -> Tuple[bool, Optional[str]]:
    if not is_email_configured():
        logger.warning("Email not configured - skipping client email")
        return False, "Email service not configured"

    try:
        template = jinja_env.get_template("email_to_client.html")
        html_content = template.render(
            name=client_name,
            project_type=get_project_type_display(project_type),
            message=message,
            submission_id=submission_id,
        )

        message_schema = MessageSchema(
            subject="Thank You for Contacting StylarkX - We've Received Your Inquiry",
            recipients=[client_email],
            body=html_content,
            subtype=MessageType.html,
        )

        await FastMail(get_email_config()).send_message(message_schema)
        logger.info("Client confirmation email sent to %s", client_email)
        return True, None
    except Exception as exc:
        error_message = str(exc)
        logger.error("Failed to send client email: %s", error_message)
        return False, error_message


async def send_email_to_company(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int,
) -> Tuple[bool, Optional[str]]:
    if not is_email_configured():
        logger.warning("Email not configured - skipping company email")
        return False, "Email service not configured"

    try:
        template = jinja_env.get_template("email_to_company.html")
        html_content = template.render(
            name=client_name,
            email=client_email,
            project_type=get_project_type_display(project_type),
            message=message,
            submission_id=submission_id,
        )

        message_schema = MessageSchema(
            subject=f"New Project Inquiry from {client_name} - StylarkX",
            recipients=[settings.COMPANY_EMAIL],
            body=html_content,
            subtype=MessageType.html,
        )

        await FastMail(get_email_config()).send_message(message_schema)
        logger.info("Company notification email sent to %s", settings.COMPANY_EMAIL)
        return True, None
    except Exception as exc:
        error_message = str(exc)
        logger.error("Failed to send company email: %s", error_message)
        return False, error_message


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

    client_success, client_error = await send_email_to_client(
        client_name=client_name,
        client_email=client_email,
        project_type=project_type,
        message=message,
        submission_id=submission_id,
    )
    results["client_email"].update({"sent": client_success, "error": client_error})

    company_success, company_error = await send_email_to_company(
        client_name=client_name,
        client_email=client_email,
        project_type=project_type,
        message=message,
        submission_id=submission_id,
    )
    results["company_email"].update({"sent": company_success, "error": company_error})

    return results
