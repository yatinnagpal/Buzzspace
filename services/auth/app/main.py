from fastapi import FastAPI
from app.routers.auth import auth_router

app = FastAPI(title="Buzzspace Auth Service", version="1.0.0")

@app.get("/healthz")
def health_check():
    return {"status": "ok"}


app.include_router(auth_router, prefix="/auth")