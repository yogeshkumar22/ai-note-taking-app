from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr

router = APIRouter()


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    """Register a new user"""
    # TODO: Implement user registration
    return {
        "access_token": "dummy_token",
        "token_type": "bearer"
    }


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login user"""
    # TODO: Implement user login
    return {
        "access_token": "dummy_token",
        "token_type": "bearer"
    }


@router.get("/me")
async def get_current_user():
    """Get current user profile"""
    # TODO: Implement get current user
    return {
        "id": 1,
        "email": "user@example.com",
        "username": "user"
    }
