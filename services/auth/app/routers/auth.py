from fastapi import APIRouter, Depends, HTTPException
from app.schemas import UserCreate, UserOut, LoginRequest, LoginResponse
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User

auth_router = APIRouter()


@auth_router.post("/signup", response_model=UserOut)
def signup(user_data:UserCreate, db: Session=Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(user_data.password)
    user = User(email = user_data.email, fullname = user_data.fullname, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created successfully", "user_id": user.id}

@auth_router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
    