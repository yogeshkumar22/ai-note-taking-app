# AI Note-Taking App - Project Documentation

## Overview

A modern, AI-powered note-taking web application built with Next.js 15, FastAPI, and various AI services. The application combines the design simplicity of Notion with the AI understanding of Mem.ai and the organizational power of Obsidian.

## Key Features

### ✨ Core Features Implemented

1. **Smart Notes Editor**
   - Rich text editing interface
   - Clean, minimal design
   - Tag management system
   - Auto-save functionality

2. **AI-Powered Assistance (API Ready)**
   - Text summarization endpoint
   - Auto-tagging capability
   - Question answering system
   - Text expansion and simplification

3. **Semantic Search (Infrastructure Ready)**
   - Vector embeddings support
   - Pinecone integration setup
   - Keyword and semantic search endpoints

4. **Organizational Features**
   - Folder management system
   - Tag-based organization
   - Pinned notes
   - Recent notes sidebar

5. **Modern UI/UX**
   - Responsive sidebar navigation
   - Dark mode support (via Tailwind)
   - Clean, distraction-free editor
   - Smooth animations ready (Framer Motion installed)

## Architecture

### Tech Stack

#### Frontend
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Custom components with Lucide React icons
- **Animations:** Framer Motion (ready for implementation)
- **Rich Text:** TipTap (installed, ready for implementation)

#### Backend
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL (async with SQLAlchemy)
- **Cache:** Redis
- **Authentication:** JWT-based (structure ready)
- **AI Integration:** OpenAI API (configured)
- **Vector Search:** Pinecone (configured)

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│                    (Next.js 15 + TS)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Editor  │  │ Sidebar  │  │   Auth   │  │  Search  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
┌──────────────────────┴──────────────────────────────────────┐
│                      Backend API                            │
│                     (FastAPI)                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Notes   │  │   Auth   │  │    AI    │  │  Search  │  │
│  │   API    │  │   API    │  │   API    │  │   API    │  │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘  │
└────────┼─────────────┼─────────────┼─────────────┼────────┘
         │             │             │             │
    ┌────┴────┐   ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
    │PostgreSQL│  │  Redis  │  │ OpenAI  │  │Pinecone │
    │   DB     │  │ Cache   │  │   API   │  │ Vector  │
    └──────────┘  └─────────┘  └─────────┘  └─────────┘
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user profile

### Notes (`/api/notes`)
- `GET /` - Get all notes
- `POST /` - Create new note
- `GET /{note_id}` - Get specific note
- `PUT /{note_id}` - Update note
- `DELETE /{note_id}` - Delete note

### AI Features (`/api/ai`)
- `POST /summarize` - Summarize text using AI
- `POST /question` - Ask questions about notes
- `POST /auto-tag/{note_id}` - Auto-generate tags
- `POST /expand` - Expand text
- `POST /simplify` - Simplify text

### Search (`/api/search`)
- `POST /semantic` - Semantic search using embeddings
- `POST /keyword` - Keyword-based search

## Database Schema

### Users Table
```sql
- id (PK)
- email (unique)
- username (unique)
- hashed_password
- is_active
- is_premium
- created_at
```

### Notes Table
```sql
- id (PK)
- title
- content
- summary
- tags (array)
- folder_id (FK)
- user_id (FK)
- is_pinned
- created_at
- updated_at
```

### Folders Table
```sql
- id (PK)
- name
- user_id (FK)
- parent_id (FK, self-referential)
- created_at
```

## Frontend Components

### Main Components
1. **Sidebar** (`components/sidebar/Sidebar.tsx`)
   - Navigation menu
   - Search functionality
   - Recent notes list
   - Collapsible design

2. **NoteEditor** (`components/editor/NoteEditor.tsx`)
   - Title input
   - Rich text area
   - Toolbar with formatting options
   - AI assistant button
   - Tag management

3. **Layout** (`app/layout.tsx`)
   - Root layout with Inter font
   - Global styles
   - Metadata configuration

### Utility Files
- `lib/api.ts` - API client with typed interfaces
- `app/globals.css` - Global styles with Tailwind

## Backend Services

### Core Services
1. **AIService** (`services/ai_service.py`)
   - Text summarization
   - Tag generation
   - Question answering
   - Text expansion/simplification

2. **VectorService** (`services/vector_service.py`)
   - Embedding generation
   - Vector storage
   - Semantic search

### Configuration
- `core/config.py` - Settings management with Pydantic
- `core/database.py` - Async database setup

## Development Workflow

### Running Locally

**Option 1: Docker Compose (Recommended)**
```bash
docker-compose up -d
```

**Option 2: Manual**
```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

# Terminal 3 - Services
docker run -d -p 5432:5432 postgres
docker run -d -p 6379:6379 redis
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Deployment

### Recommended Hosting

- **Frontend:** Vercel (optimized for Next.js)
- **Backend:** Railway, Render, or AWS
- **Database:** Supabase, Neon, or managed PostgreSQL
- **Redis:** Redis Cloud or Upstash

### Environment Variables

See SETUP.md for detailed environment configuration.

### Deployment Steps

1. Set up PostgreSQL and Redis instances
2. Deploy backend to cloud provider
3. Configure environment variables
4. Deploy frontend to Vercel
5. Update CORS settings
6. Test all endpoints

## Future Enhancements

### Planned Features
1. ✅ Basic note editor
2. ✅ API structure for AI features
3. ⬜ Real-time collaboration
4. ⬜ Audio/voice notes with Whisper API
5. ⬜ Advanced rich text editing with TipTap
6. ⬜ Mobile PWA
7. ⬜ Chrome extension
8. ⬜ Email integration
9. ⬜ Public note sharing
10. ⬜ Advanced AI features (flash cards, quizzes)

### AI Improvements
- Implement actual OpenAI API calls
- Add context-aware suggestions
- Implement automatic note linking
- Add AI-powered note recommendations

### UI/UX Improvements
- Add drag-and-drop for notes
- Implement keyboard shortcuts
- Add note templates
- Enhance mobile responsiveness
- Add more themes

## Testing

### Backend Testing
```bash
cd backend
pytest  # (Add tests as needed)
```

### Frontend Testing
```bash
cd frontend
npm test  # (Add tests as needed)
```

## Security Considerations

1. **Authentication:** JWT-based with secure token storage
2. **Database:** Use parameterized queries (SQLAlchemy)
3. **API Keys:** Store in environment variables, never commit
4. **CORS:** Configure allowed origins properly
5. **Input Validation:** Pydantic models for request validation
6. **Rate Limiting:** Implement for API endpoints (recommended)

## Performance Optimization

1. **Caching:** Redis for frequently accessed data
2. **Database:** Indexes on commonly queried fields
3. **Frontend:** Next.js automatic code splitting
4. **API:** Async/await for non-blocking operations
5. **Vector Search:** Batch processing for embeddings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Specify your license here]

## Support

For questions and support:
- Check SETUP.md for setup issues
- Review API documentation at `/docs`
- Open an issue on GitHub
