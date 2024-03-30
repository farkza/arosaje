from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt

# Créer une instance de FastAPI
app = FastAPI()

# Chemin vers la base de données
DATABASE_PATH = "arosaje.db"  # Assurez-vous que le chemin est correct

# Clé secrète pour signer les jetons JWT
SECRET_KEY = "arosaje"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Durée de validité de l'access token

# Ajoutez le middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Vous pouvez remplacer * par vos origines autorisées
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Déclaration du modèle Pydantic pour les informations de l'utilisateur
class User(BaseModel):
    username: str
    password: str

# Fonction pour se connecter à la base de données
def connect_to_database():
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        return conn
    except Exception as e:
        error_detail = f"500: unable to open database file at {DATABASE_PATH}"
        raise HTTPException(status_code=500, detail=error_detail)

# Fonction pour créer un access token JWT
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Route de connexion
@app.post("/api/login")
def login(user: User):
    try:
        conn = connect_to_database()
        cursor = conn.cursor()
        # Sélectionnez le nom d'utilisateur et le mot de passe de la table utilisateurs
        cursor.execute("SELECT nom_utilisateur, mdp FROM utilisateurs WHERE nom_utilisateur = ? AND mdp = ?", (user.username, user.password))
        fetched_user = cursor.fetchone()
        conn.close()

        if fetched_user is None:
            raise HTTPException(status_code=401, detail="Identifiants incorrects")
        
        # Générer l'access token
        access_token = create_access_token(data={"username": user.username})

        # Retourner l'access token
        return {"access_token": access_token, "token_type": "bearer"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route racine
@app.get("/")
def read_root():
    return {"message": "Bienvenue sur mon API FastAPI"}

# Route pour obtenir les plantes depuis la base de données
@app.get("/get_plantes_from_db")
def get_plantes_from_db():
    try:
        conn = connect_to_database()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM plantes")
        plantes = cursor.fetchall()
        conn.close()

        if not plantes:
            raise HTTPException(status_code=404, detail="Aucune plante trouvée dans la base de données")

        return {"plantes": plantes}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Nouvelle route de test pour vérifier la connexion à la base de données
@app.get("/test_db_connection")
def test_db_connection():
    try:
        conn = connect_to_database()
        conn.close()
        return {"message": "Connexion à la base de données réussie !"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
