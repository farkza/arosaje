from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

class Plante(BaseModel):
    id: int
    nom: str
    poids: float
    especes: str
