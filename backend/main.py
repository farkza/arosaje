from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

# Créer une instance de FastAPI
app = FastAPI()

# Chemin vers la base de données
DATABASE_PATH = "arosaje.db"  # Assurez-vous que le chemin est correct

# Ajoutez le middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Vous pouvez remplacer * par vos origines autorisées
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def connect_to_database():
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        return conn
    except Exception as e:
        error_detail = f"500: unable to open database file at {DATABASE_PATH}"
        raise HTTPException(status_code=500, detail=error_detail)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur mon API FastAPI"}

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
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Nouvelle route de test pour vérifier la connexion à la base de données
@app.get("/test_db_connection")
def test_db_connection():
    try:
        conn = connect_to_database()
        conn.close()
        return {"message": "Connexion à la base de données réussie !"}
    except Exception as e:
        return {"error": f"Impossible de se connecter à la base de données : {str(e)}"}
