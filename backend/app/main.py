from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import notes, ai, search, auth

app = FastAPI(
    title="AI Note-Taking App API",
    description="Backend API for AI-powered note-taking application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(notes.router, prefix="/api/notes", tags=["Notes"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Features"])
app.include_router(search.router, prefix="/api/search", tags=["Search"])

@app.get("/")
async def root():
    return {
        "message": "AI Note-Taking App API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
