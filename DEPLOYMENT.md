# Deployment Guide (Neon + Render + Vercel/GitHub Pages)

This repo is prepared for:
- Backend: Render (`backend/`)
- Database: Neon Postgres
- Frontend: Vercel or GitHub Pages (`/`)

## 1) Create Neon Database

1. Create a Neon project.
2. Copy the connection string.
3. Ensure it includes SSL:
   - `?sslmode=require`

Example:
`postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`

## 2) Deploy Backend to Render

### Option A: Blueprint (recommended)
1. Push this repo to GitHub.
2. In Render, create from Blueprint and select this repo.
3. Render reads `render.yaml`.

### Option B: Manual Web Service
1. New Web Service -> connect repo.
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Required Render Environment Variables

Set these in Render service settings:

- `ENVIRONMENT=production`
- `DATABASE_URL=<your neon connection string>`
- `MAIL_USERNAME=stylarkofficial@gmail.com`
- `MAIL_PASSWORD=<gmail app password>`
- `MAIL_FROM=stylarkofficial@gmail.com`
- `COMPANY_EMAIL=<where inquiry notifications go>`
- `FRONTEND_URL=<your frontend URL>`
- `CORS_ORIGINS=<comma-separated exact origins>`
- `CORS_ALLOW_ORIGIN_REGEX=^https://.*\\.vercel\\.app$` (optional; good for Vercel previews)

After deployment, verify:
- `https://<render-service>.onrender.com/health`

## 3) Deploy Frontend to Vercel

1. Import repo into Vercel.
2. Framework preset: Vite.
3. Set Project Environment Variables:
   - `VITE_API_URL=https://<render-service>.onrender.com`
   - `VITE_BASE_PATH=/`
4. Deploy.

## 4) Deploy Frontend to GitHub Pages (alternative)

Workflow file is included:
- `.github/workflows/deploy-gh-pages.yml`

GitHub repo setup:
1. Go to `Settings -> Pages`.
2. Source: `GitHub Actions`.
3. Add repo secret:
   - `VITE_API_URL=https://<render-service>.onrender.com`
4. Push to `main` to trigger deploy.

The workflow automatically sets:
- `VITE_BASE_PATH=/<repo-name>/`

## 5) Post-Deployment Checks

1. Frontend loads successfully.
2. Contact form submit returns success.
3. Render logs show submission created.
4. Gmail sends:
   - confirmation email to client
   - notification email to company address
5. `/health` returns:
   - `status: healthy`
   - `database: healthy`
   - `email_service: configured`

## Notes

- Backend supports `DATABASE_URL` (Neon/Postgres) and legacy MySQL fallback.
- For production, always use `DATABASE_URL`.
- Keep all secrets in platform env vars, not committed files.
