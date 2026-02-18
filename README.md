# VectorMind

VectorMind is a full-stack AI-powered personalized learning roadmap platform.

## Current Mode
This branch is set up as **frontend-first mock mode** so product/UI can be iterated quickly without backend dependency.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind CSS + React Router + React Flow
- Backend: FastAPI + SQLAlchemy + SQLite (default)
- LLM: OpenAI Chat Completions API

## Frontend Pages
- `/` Landing
- `/roadmaps` Mock roadmap gallery (7 roadmaps)
- `/roadmap/:roadmapId` Roadmap workspace (clean graph spacing, node detail, mock chat)
- `/profile` Profile editor (mock)
- `/about` Product/build notes

## Project Structure
```
backend/
  app/
frontend/
  src/
    components/
    data/
    layout/
    pages/
```

## Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

## Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoints (backend path retained)
- `POST /generate-roadmap`
- `GET /roadmap/{user_id}`
- `POST /update-progress`
- `POST /chat`
- `GET /health`

## Notes
- Set `OPENAI_API_KEY` in `backend/.env`.
- For production, switch `DATABASE_URL` to PostgreSQL.
- Frontend can later switch from mocks to backend API calls with minimal wiring changes.
