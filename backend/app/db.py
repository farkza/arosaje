import sqlite3
from fastapi import HTTPException


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

        return {"plantes": plantes}
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
