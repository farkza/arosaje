from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.auth import login
from app.db import get_plantes_from_db, test_db_connection
from app.models import User

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.post("/api/login")
def login_route(user: User):
    return login(user)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur mon API FastAPI"}

@app.get("/get_plantes_from_db")
def get_plantes_route():
    return get_plantes_from_db()

@app.get("/test_db_connection")
def test_db_connection_route():
    return test_db_connection()
