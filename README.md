# VectorMind

VectorMind is a full-stack AI-powered personalized learning roadmap platform.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind CSS + React Router + React Flow
- Backend: FastAPI + SQLAlchemy + SQLite (default)
- LLM: OpenAI Chat Completions API

## Project Structure
```
backend/
  app/
    config.py
    main.py
    db/
    models/
    prompts/
    routers/
    schemas/
    services/
frontend/
  src/
    api/
    components/
    pages/
    styles/
    types/
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

## API Endpoints
- `POST /generate-roadmap`
- `GET /roadmap/{user_id}`
- `POST /update-progress`
- `POST /chat`
- `GET /health`

## Notes
- Set `OPENAI_API_KEY` in `backend/.env`.
- For production, switch `DATABASE_URL` to PostgreSQL.
- Frontend is Vercel-friendly and backend can run on any ASGI host.
