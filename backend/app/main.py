"""
══════════════════════════════════════════════
STYLARKX — MAIN APPLICATION
══════════════════════════════════════════════

FastAPI Backend for StylarkX Website
- Contact Form API
- Email Notifications
- SQL Database (Neon Postgres / MySQL)

Author: StylarkX Engineering Team
══════════════════════════════════════════════
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
from datetime import datetime
import logging

from .config import settings
from .database import init_db, check_db_connection
from .routers import contact
from .schemas import HealthCheckResponse, ErrorResponse
from .email_service import is_email_configured

# ══════════════════════════════════════════════
# LOGGING CONFIGURATION
# ══════════════════════════════════════════════

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


# ══════════════════════════════════════════════
# APPLICATION LIFESPAN
# ══════════════════════════════════════════════

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    """
    # Startup
    logger.info("🚀 Starting StylarkX Backend...")
    
    # Initialize database
    try:
        init_db()
        logger.info("✅ Database initialized successfully")
    except Exception as e:
        logger.error(f"❌ Database initialization failed: {str(e)}")
    
    logger.info("═" * 50)
    logger.info("  STYLARKX BACKEND IS RUNNING")
    logger.info(f"  Environment: {settings.ENVIRONMENT}")
    logger.info(f"  API Docs: http://localhost:8000/docs")
    logger.info("═" * 50)
    
    yield
    
    # Shutdown
    logger.info("👋 Shutting down StylarkX Backend...")


# ══════════════════════════════════════════════
# CREATE APPLICATION
# ══════════════════════════════════════════════

app = FastAPI(
    title="StylarkX API",
    description="""
    ## StylarkX Backend API
    
    Full-Stack Engineering Studio Backend Service.
    
    ### Features:
    - 📬 Contact Form Submission
    - 📧 Email Notifications (Company + Client)
    - 💾 MySQL Database Storage
    - 📊 Submission Management
    
    ### Contact:
    - Website: [stylarkx.com](https://stylarkx.com)
    - Email: hello@stylarkx.com
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)


# ══════════════════════════════════════════════
# CORS MIDDLEWARE
# ══════════════════════════════════════════════

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=settings.CORS_ALLOW_ORIGIN_REGEX or None,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)


# ══════════════════════════════════════════════
# EXCEPTION HANDLERS
# ══════════════════════════════════════════════

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors."""
    errors = exc.errors()
    error_messages = []
    
    for error in errors:
        field = " -> ".join(str(loc) for loc in error["loc"])
        message = error["msg"]
        error_messages.append(f"{field}: {message}")
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": "Validation Error",
            "detail": "; ".join(error_messages)
        }
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions."""
    logger.error(f"Unhandled exception: {str(exc)}")
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": "Internal Server Error",
            "detail": "An unexpected error occurred."
        }
    )


# ══════════════════════════════════════════════
# INCLUDE ROUTERS
# ══════════════════════════════════════════════

app.include_router(contact.router, prefix="/api/v1")


# ══════════════════════════════════════════════
# ROOT ENDPOINTS
# ══════════════════════════════════════════════

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint."""
    return {
        "name": "StylarkX API",
        "version": "1.0.0",
        "status": "operational",
        "documentation": "/docs"
    }


@app.get("/health", response_model=HealthCheckResponse, tags=["Health"])
async def health_check():
    """Health check endpoint."""
    db_healthy = check_db_connection()
    email_configured = is_email_configured()
    
    return HealthCheckResponse(
        status="healthy" if db_healthy else "degraded",
        message="StylarkX API is operational",
        timestamp=datetime.utcnow(),
        database="healthy" if db_healthy else "unhealthy",
        email_service="configured" if email_configured else "not configured"
    )


@app.get("/api/v1", tags=["Root"])
async def api_v1_root():
    """API v1 root endpoint."""
    return {
        "api_version": "v1",
        "endpoints": {
            "contact_submit": "/api/v1/contact/submit",
            "contact_submissions": "/api/v1/contact/submissions",
            "health": "/health"
        }
    }
