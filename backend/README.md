# StylarkX Backend

FastAPI backend for the StylarkX website contact form. The backend is intentionally email-only: it validates contact requests and sends one notification to StylarkX and one confirmation email to the client.

## Quick Start

### Prerequisites
- Python 3.10+
- Gmail account with an App Password

### Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Environment
Create `backend/.env` with:
```env
ENVIRONMENT=development
PORT=8000
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CORS_ALLOW_ORIGIN_REGEX=^https://.*\.vercel\.app$
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_16_char_app_password
MAIL_FROM=your_email@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_FROM_NAME=StylarkX
MAIL_STARTTLS=true
MAIL_SSL_TLS=false
USE_CREDENTIALS=true
VALIDATE_CERTS=true
COMPANY_EMAIL=hello@stylarkx.com
```

### Run
```bash
python run.py
```

Server: `http://localhost:8000`
Docs: `http://localhost:8000/docs`

## API Endpoints
- `GET /`
- `GET /health`
- `POST /api/v1/contact/submit`

## Deployment
- Railway deploys the backend using the repo-level `railway.json`
- Vercel deploys the frontend from the repo root
- No database is required

## Notes
- `submission_id` is a generated inquiry reference, not a stored database row ID
- `/api/v1/contact/submissions*` endpoints are intentionally disabled
