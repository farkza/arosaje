# from fastapi.testclient import TestClient
# from backend.main import app

# client = TestClient(app)

# def test_read_root():
#    response = client.get("/")
#    assert response.status_code == 200
#    assert response.json() == {"message": "Bienvenue sur mon API FastAPI"}

def add(a, b):
    return a + b

def test_addition():
    assert add(1, 2) == 3
    assert add(0, 0) == 0
    assert add(-1, 1) == 0