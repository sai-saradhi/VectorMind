from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.db.database import Base, engine
from app.routers.routes import router

settings = get_settings()
Base.metadata.create_all(bind=engine)

app = FastAPI(title='VectorMind API')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(',')],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(router)


@app.get('/health')
def health():
    return {'status': 'ok'}
