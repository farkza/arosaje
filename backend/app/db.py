import sqlite3
from fastapi import HTTPException
from app.models import Plante

DATABASE_PATH = "arosaje.db"

def connect_to_database():
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        return conn
    except Exception as e:
        error_detail = f"500: unable to open database file at {DATABASE_PATH}"
        raise HTTPException(status_code=500, detail=error_detail)

def get_plantes_from_db():
    try:
        conn = connect_to_database()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM plantes")
        plantes = cursor.fetchall()
        conn.close()

        if not plantes:
            raise HTTPException(status_code=404, detail="Aucune plante trouvée dans la base de données")

        return {"plantes": [Plante(id=row[0], nom=row[1], poids=row[2], especes=row[3]) for row in plantes]}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def test_db_connection():
    try:
        conn = connect_to_database()
        conn.close()
        return {"message": "Connexion à la base de données réussie !"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def add_plante_to_db(plante: Plante):
    try:
        conn = connect_to_database()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO plantes (nom, poids, especes) VALUES (?, ?, ?)", (plante.nom, plante.poids, plante.especes))
        conn.commit()
        conn.close()
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

