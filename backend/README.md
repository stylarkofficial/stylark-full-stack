# StylarkX Backend

FastAPI backend for StylarkX website with contact form handling and email notifications.

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.10+
- MySQL Server
- Gmail account (for email notifications)

### 2. Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Required settings in `.env`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=stylarkx_db

# Email (Gmail)
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_16_char_app_password
MAIL_FROM=your_email@gmail.com

# Company
COMPANY_EMAIL=hello@stylarkx.com
```

### 4. Setup Database

```bash
# Login to MySQL
mysql -u root -p

# Run the SQL script
source create_database.sql
```

Or manually:
```sql
CREATE DATABASE stylarkx_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Run Server

```bash
python run.py
```

Server runs at: http://localhost:8000

## 📚 API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API root |
| GET | `/health` | Health check |
| POST | `/api/v1/contact/submit` | Submit contact form |
| GET | `/api/v1/contact/submissions` | Get all submissions |
| GET | `/api/v1/contact/submissions/{id}` | Get submission by ID |

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Go to: Google Account → Security → App passwords
3. Generate a new app password for "Mail"
4. Use this 16-character password in `MAIL_PASSWORD`

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py         # Settings
│   ├── database.py       # DB connection
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── crud.py           # Database operations
│   ├── email_service.py  # Email handling
│   ├── main.py           # FastAPI app
│   └── routers/
│       ├── __init__.py
│       └── contact.py    # Contact API
├── templates/
│   ├── email_to_company.html
│   └── email_to_client.html
├── requirements.txt
├── .env.example
├── create_database.sql
├── run.py
└── README.md
```

## 🔧 Development

```bash
# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📝 License

© 2024 StylarkX. All rights reserved.
