from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    limit: int = 10


class SearchResult(BaseModel):
    note_id: int
    title: str
    content_snippet: str
    score: float


class SearchResponse(BaseModel):
    results: List[SearchResult]
    total: int


@router.post("/semantic", response_model=SearchResponse)
async def semantic_search(request: SearchRequest):
    """Perform semantic search across notes"""
    # TODO: Implement semantic search with embeddings
    return {
        "results": [],
        "total": 0
    }


@router.post("/keyword", response_model=SearchResponse)
async def keyword_search(request: SearchRequest):
    """Perform keyword search across notes"""
    # TODO: Implement keyword search
    return {
        "results": [],
        "total": 0
    }
