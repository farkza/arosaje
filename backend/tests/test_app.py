import pytest
from fastapi.testclient import TestClient
from ..main import app


# Utilisez une base de données de test séparée si nécessaire
TEST_DATABASE_PATH = "test_arosaje.db"

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client

def test_read_root(test_app):
    response = test_app.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Bienvenue sur mon API FastAPI"}

def test_get_plantes_from_db(test_app):
    response = test_app.get("/get_plantes_from_db")
    assert response.status_code == 200
    assert response.json().get("plantes") is not None

def test_test_db_connection(test_app):
    response = test_app.get("/test_db_connection")
    assert response.status_code == 200
    assert response.json() == {"message": "Connexion à la base de données réussie !"}
