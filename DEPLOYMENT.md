# StylarkX Deployment

## Architecture
- Frontend: Vercel
- Backend: Railway
- Contact workflow: email-only
- Database: not used

## Railway
Railway reads the repo-level `railway.json`.

Required environment variables:
```env
ENVIRONMENT=production
PORT=8000
FRONTEND_URL=https://YOUR-VERCEL-DOMAIN.vercel.app
CORS_ORIGINS=https://YOUR-VERCEL-DOMAIN.vercel.app
CORS_ALLOW_ORIGIN_REGEX=^https://.*\.vercel\.app$
MAIL_USERNAME=yourgmail@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_FROM=yourgmail@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_FROM_NAME=StylarkX
MAIL_STARTTLS=true
MAIL_SSL_TLS=false
USE_CREDENTIALS=true
VALIDATE_CERTS=true
COMPANY_EMAIL=yourbusinessmail@gmail.com
```

Health check:
- `/health`

Expected response:
- `status: healthy`
- `database: disabled`
- `email_service: configured`

## Vercel
Set this environment variable in Vercel:
```env
VITE_API_URL=https://YOUR-RAILWAY-URL
```

Framework:
- Vite

## Verification
1. Load the frontend
2. Submit the contact form
3. Confirm the success message appears
4. Confirm company notification email arrives
5. Confirm client acknowledgement email arrives
