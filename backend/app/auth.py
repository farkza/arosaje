from datetime import datetime, timedelta
import jwt
from app.models import User
from app.db import connect_to_database
from fastapi import HTTPException
import sqlite3

SECRET_KEY = "arosaje"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def login(user: User):
    try:
        conn = connect_to_database()
        cursor = conn.cursor()
        cursor.execute("SELECT nom_utilisateur, mdp FROM utilisateurs WHERE nom_utilisateur = ? AND mdp = ?", (user.username, user.password))
        fetched_user = cursor.fetchone()
        conn.close()

        if fetched_user is None:
            raise HTTPException(status_code=401, detail="Identifiants incorrects")
        
        access_token = create_access_token(data={"username": user.username})
        return {"access_token": access_token, "token_type": "bearer"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
