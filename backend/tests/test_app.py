import pytest
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Bienvenue sur mon API FastAPI"}

def test_test_db_connection():
    response = client.get("/test_db_connection")
    assert response.status_code == 200
    assert response.json() == {"message": "Connexion à la base de données réussie !"}
