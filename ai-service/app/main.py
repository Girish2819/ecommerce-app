from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.routes.chat import router as chat_router


app = FastAPI(
    title="E-Commerce AI Service",
    description="AI shopping assistant for the e-commerce application",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        settings.CLIENT_URL
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Routes
app.include_router(
    chat_router,
    prefix="/api/ai",
    tags=["AI Chat"]
)


@app.get("/")
async def root():

    return {
        "success": True,
        "message": "E-Commerce AI Service is running"
    }


@app.get("/health")
async def health():

    return {
        "status": "healthy"
    }
    
    // Add more routes and functionality as needed