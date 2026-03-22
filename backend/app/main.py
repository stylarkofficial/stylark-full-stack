from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
from datetime import datetime
import logging

from .config import settings
from .routers import contact
from .schemas import HealthCheckResponse
from .email_service import is_email_configured

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting StylarkX Backend...")
    logger.info("Email mode only: database storage disabled")
    logger.info("Environment: %s", settings.ENVIRONMENT)
    logger.info("API Docs: http://localhost:%s/docs", settings.PORT)
    yield
    logger.info("Shutting down StylarkX Backend...")


app = FastAPI(
    title="StylarkX API",
    description="""
    ## StylarkX Backend API

    Full-Stack Engineering Studio Backend Service.

    ### Features:
    - Contact Form Submission
    - Email Notifications (Company + Client)
    - Email-only inquiry workflow

    ### Contact:
    - Website: https://stylarkx.com
    - Email: hello@stylarkx.com
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=settings.CORS_ALLOW_ORIGIN_REGEX or None,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    error_messages = []
    for error in errors:
        field = " -> ".join(str(loc) for loc in error["loc"])
        error_messages.append(f"{field}: {error['msg']}")

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": "Validation Error",
            "detail": "; ".join(error_messages),
        },
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", str(exc))
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": "Internal Server Error",
            "detail": "An unexpected error occurred.",
        },
    )


app.include_router(contact.router, prefix="/api/v1")


@app.get("/", tags=["Root"])
async def root():
    return {
        "name": "StylarkX API",
        "version": "1.0.0",
        "status": "operational",
        "mode": "email-only",
        "documentation": "/docs",
    }


@app.get("/health", response_model=HealthCheckResponse, tags=["Health"])
async def health_check():
    email_configured = is_email_configured()
    return HealthCheckResponse(
        status="healthy" if email_configured else "degraded",
        message="StylarkX API is operational",
        timestamp=datetime.utcnow(),
        database="disabled",
        email_service="configured" if email_configured else "not configured",
    )


@app.get("/api/v1", tags=["Root"])
async def api_v1_root():
    return {
        "api_version": "v1",
        "mode": "email-only",
        "endpoints": {
            "contact_submit": "/api/v1/contact/submit",
            "health": "/health",
        },
    }
