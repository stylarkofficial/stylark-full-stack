# StylarkX Deployment

## Architecture
- Frontend: Railway or Vercel
- Backend: Railway
- Contact workflow: email-only
- Database: not used

## Backend Service on Railway
Configure the backend Railway service manually with:
- Root Directory: `backend`
- Build Command: `python -m pip install -r requirements.txt`
- Start Command: `python run.py`

Required variables:
```env
ENVIRONMENT=production
PORT=8000
FRONTEND_URL=https://YOUR-FRONTEND-DOMAIN
CORS_ORIGINS=https://YOUR-FRONTEND-DOMAIN
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
COMPANY_EMAIL=stylarkofficial@gmail.com
```

Health check:
- `/health`

## Frontend Service on Railway
Configure the frontend Railway service manually with:
- Root Directory: repo root
- Build Command: `npm run build`
- Start Command: `npm run start:railway`

Required variable:
```env
VITE_API_URL=https://YOUR-BACKEND-RAILWAY-DOMAIN
```

## Frontend on Vercel
If you use Vercel instead:
```env
VITE_API_URL=https://YOUR-BACKEND-RAILWAY-DOMAIN
```

## Verification
1. Backend `/health` returns healthy
2. Frontend loads
3. Contact form submits successfully
4. Company email arrives
5. Client acknowledgement email arrives
