from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient, ReturnDocument
from pymongo.errors import ServerSelectionTimeoutError
from typing import List, Dict

app = FastAPI()

# Middleware CORS pour autoriser les requêtes depuis http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Connexion à la base de données MongoDB
try:
    client = MongoClient("mongodb://192.0.0.2:27017/")
    database = client["arosaje"]
    plantes_collection = database["plantes"]
    utilisateurs_collection = database["utilisateurs"]
except ServerSelectionTimeoutError as e:
    raise HTTPException(status_code=500, detail="Impossible de se connecter à la base de données MongoDB")

@app.get("/api/connexion_bdd", tags=["Base"])
async def test_connexion_bdd():
    try:
        # Tester la connexion à la base de données
        client.server_info()
        return {"message": len(list(plantes_collection.find()))}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/plantes", tags=["Plantes"])
async def get_plantes():
    try:
        # Récupérer toutes les plantes depuis la collection
        plantes = list(plantes_collection.find())
        
        # Formater les détails des plantes pour l'affichage
        plantes_details = []
        for plante in plantes:
            plante_detail = {
                "id": str(plante["_id"]),
                "nom": plante["nom"],
                "poids": plante["poids"],
                "especes": plante["especes"]
            }
            plantes_details.append(plante_detail)
        
        return plantes_details
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/plantes/count", tags=["Plantes"])
async def count_plantes():
    try:
        # Compter le nombre de plantes dans la collection
        count = plantes_collection.count_documents({})
        return {"count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
