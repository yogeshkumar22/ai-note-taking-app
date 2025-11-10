# Backend API - AI Note-Taking App

FastAPI backend for the AI-powered note-taking application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your actual credentials:
   - Database URL
   - Redis URL
   - OpenAI API key
   - Pinecone credentials

## Running the Server

Development mode:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Production mode:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes/` - Get all notes
- `POST /api/notes/` - Create new note
- `GET /api/notes/{note_id}` - Get specific note
- `PUT /api/notes/{note_id}` - Update note
- `DELETE /api/notes/{note_id}` - Delete note

### AI Features
- `POST /api/ai/summarize` - Summarize text
- `POST /api/ai/question` - Ask question about notes
- `POST /api/ai/auto-tag/{note_id}` - Auto-generate tags
- `POST /api/ai/expand` - Expand text
- `POST /api/ai/simplify` - Simplify text

### Search
- `POST /api/search/semantic` - Semantic search
- `POST /api/search/keyword` - Keyword search

## Database Setup

The application uses PostgreSQL. You can set up the database using Docker:

```bash
docker run --name notes-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=notesdb -p 5432:5432 -d postgres
```

For Redis:
```bash
docker run --name notes-redis -p 6379:6379 -d redis
```

## Project Structure

```
backend/
├── app/
│   ├── api/          # API routes
│   ├── core/         # Core configuration
│   ├── models/       # Database models
│   ├── services/     # Business logic
│   └── main.py       # Application entry point
├── requirements.txt  # Python dependencies
└── .env.example      # Environment variables template
```
