# AI Note-Taking App - Setup Guide

This guide will help you set up and run the AI-powered note-taking application locally.

## Prerequisites

- Node.js 20+ and npm
- Python 3.12+
- PostgreSQL 15+
- Redis 7+
- Docker and Docker Compose (optional, for containerized setup)

## Quick Start with Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd ai-note-taking-app

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Documentation: http://localhost:8000/docs
```

## Manual Setup

### 1. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Required: DATABASE_URL, REDIS_URL, SECRET_KEY
# Optional: OPENAI_API_KEY, PINECONE_API_KEY

# Run the backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Database Setup

#### Using Docker:
```bash
# PostgreSQL
docker run --name notes-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=notesdb -p 5432:5432 -d postgres:15-alpine

# Redis
docker run --name notes-redis -p 6379:6379 -d redis:7-alpine
```

#### Manual Installation:
- Install PostgreSQL and create a database named `notesdb`
- Install Redis and start the service
- Update DATABASE_URL and REDIS_URL in backend/.env

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local if needed
# NEXT_PUBLIC_API_URL should point to your backend (default: http://localhost:8000)

# Run the development server
npm run dev
```

The frontend will be available at http://localhost:3000

## Environment Configuration

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/notesdb

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI (Optional - for AI features)
OPENAI_API_KEY=your-openai-api-key

# Pinecone (Optional - for vector search)
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=notes-embeddings
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=AI Note-Taking App
```

## Enabling AI Features

To enable AI-powered features, you need to:

1. Sign up for OpenAI API at https://platform.openai.com/
2. Get your API key
3. Add it to backend/.env as `OPENAI_API_KEY`

For semantic search with vector embeddings:

1. Sign up for Pinecone at https://www.pinecone.io/
2. Create an index named "notes-embeddings"
3. Add your credentials to backend/.env

## Testing the Setup

1. **Backend Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Frontend:**
   Open http://localhost:3000 in your browser

3. **API Documentation:**
   Visit http://localhost:8000/docs for interactive API documentation

## Project Structure

```
ai-note-taking-app/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── core/        # Configuration
│   │   ├── models/      # Database models
│   │   ├── services/    # Business logic
│   │   └── main.py      # Application entry
│   ├── requirements.txt
│   └── README.md
├── frontend/            # Next.js frontend
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── lib/            # Utilities and API client
│   ├── package.json
│   └── README.md
├── docker-compose.yml  # Docker Compose configuration
├── README.md           # Project overview
└── SETUP.md           # This file
```

## Available Scripts

### Backend
- `uvicorn app.main:app --reload` - Run development server
- `uvicorn app.main:app` - Run production server

### Frontend
- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run linter

## Troubleshooting

### Port already in use
If ports 3000, 8000, 5432, or 6379 are already in use:
- Change the port in the respective configuration files
- Update docker-compose.yml port mappings

### Database connection issues
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in backend/.env
- Ensure database `notesdb` exists

### Frontend can't connect to backend
- Verify backend is running on port 8000
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Check CORS settings in backend/app/main.py

## Next Steps

1. Create an account using the authentication endpoints
2. Start creating notes
3. Try AI features like summarization and auto-tagging
4. Explore semantic search functionality

## Support

For issues and questions, please refer to:
- Backend API docs: http://localhost:8000/docs
- Project README: README.md
- GitHub repository issues
