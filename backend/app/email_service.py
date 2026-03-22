"""
══════════════════════════════════════════════
STYLARKX — EMAIL SERVICE
══════════════════════════════════════════════
Sends emails to:
1. CLIENT - Thank you confirmation
2. COMPANY - New inquiry notification
══════════════════════════════════════════════
"""

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from typing import Optional, Tuple, Dict, Any
import logging

from .config import settings

logger = logging.getLogger(__name__)

# Template directory
template_dir = Path(__file__).parent.parent / "templates"


def get_email_config() -> ConnectionConfig:
    """Create email configuration."""
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
        TEMPLATE_FOLDER=template_dir
    )


# Jinja2 environment for templates
jinja_env = Environment(loader=FileSystemLoader(str(template_dir)))


def get_project_type_display(project_type: str) -> str:
    """Convert project type code to display name."""
    mapping = {
        "website": "Custom Website Development",
        "ecommerce": "eCommerce Platform",
        "ai": "AI & ML Integration",
        "enterprise": "Enterprise Platform",
        "brand": "Portfolio & Brand System",
        "other": "Other Project"
    }
    return mapping.get(project_type, project_type.title())


def is_email_configured() -> bool:
    """Check if email credentials are configured."""
    return bool(settings.MAIL_USERNAME and settings.MAIL_PASSWORD)


async def send_email_to_client(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int
) -> Tuple[bool, Optional[str]]:
    """
    Send thank you confirmation email to the CLIENT.
    
    Args:
        client_name: Client's name
        client_email: Client's email address (recipient)
        project_type: Type of project
        message: Client's message
        submission_id: Database submission ID
    
    Returns:
        Tuple of (success: bool, error_message: Optional[str])
    """
    if not is_email_configured():
        logger.warning("Email not configured - skipping client email")
        return False, "Email service not configured"
    
    try:
        # Load template
        template = jinja_env.get_template("email_to_client.html")
        html_content = template.render(
            name=client_name,
            project_type=get_project_type_display(project_type),
            message=message,
            submission_id=submission_id
        )
        
        # Create message
        message_schema = MessageSchema(
            subject="Thank You for Contacting StylarkX — We've Received Your Inquiry",
            recipients=[client_email],  # Send to CLIENT's email
            body=html_content,
            subtype=MessageType.html
        )
        
        # Send
        fast_mail = FastMail(get_email_config())
        await fast_mail.send_message(message_schema)
        
        logger.info(f"✅ Thank you email sent to CLIENT: {client_email}")
        return True, None
        
    except Exception as e:
        error_msg = str(e)
        logger.error(f"❌ Failed to send client email: {error_msg}")
        return False, error_msg


async def send_email_to_company(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int
) -> Tuple[bool, Optional[str]]:
    """
    Send notification email to COMPANY about new inquiry.
    
    Args:
        client_name: Client's name
        client_email: Client's email address
        project_type: Type of project
        message: Client's message
        submission_id: Database submission ID
    
    Returns:
        Tuple of (success: bool, error_message: Optional[str])
    """
    if not is_email_configured():
        logger.warning("Email not configured - skipping company email")
        return False, "Email service not configured"
    
    try:
        # Load template
        template = jinja_env.get_template("email_to_company.html")
        html_content = template.render(
            name=client_name,
            email=client_email,
            project_type=get_project_type_display(project_type),
            message=message,
            submission_id=submission_id
        )
        
        # Create message
        message_schema = MessageSchema(
            subject=f"🚀 New Project Inquiry from {client_name} — StylarkX",
            recipients=[settings.COMPANY_EMAIL],  # Send to COMPANY email
            body=html_content,
            subtype=MessageType.html
        )
        
        # Send
        fast_mail = FastMail(get_email_config())
        await fast_mail.send_message(message_schema)
        
        logger.info(f"✅ Notification email sent to COMPANY: {settings.COMPANY_EMAIL}")
        return True, None
        
    except Exception as e:
        error_msg = str(e)
        logger.error(f"❌ Failed to send company email: {error_msg}")
        return False, error_msg


async def send_both_emails(
    client_name: str,
    client_email: str,
    project_type: str,
    message: str,
    submission_id: int
) -> Dict[str, Any]:
    """
    Send both emails:
    1. Thank you to CLIENT
    2. Notification to COMPANY
    
    Returns:
        Dictionary with results for both emails
    """
    results = {
        "client_email": {"sent": False, "error": None, "recipient": client_email},
        "company_email": {"sent": False, "error": None, "recipient": settings.COMPANY_EMAIL}
    }
    
    # Send to CLIENT
    client_success, client_error = await send_email_to_client(
        client_name=client_name,
        client_email=client_email,
        project_type=project_type,
        message=message,
        submission_id=submission_id
    )
    results["client_email"]["sent"] = client_success
    results["client_email"]["error"] = client_error
    
    # Send to COMPANY
    company_success, company_error = await send_email_to_company(
        client_name=client_name,
        client_email=client_email,
        project_type=project_type,
        message=message,
        submission_id=submission_id
    )
    results["company_email"]["sent"] = company_success
    results["company_email"]["error"] = company_error
    
    return results
