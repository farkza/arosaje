from fastapi import FastAPI, HTTPException, Depends, status
import models
from db import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel   
from typing import List, Annotated
from datetime import date
# import auth
# from auth import get_current_user


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db=SessionLocal()
        yield db
    finally:
        db.close()

class User(BaseModel):
    id: int
    email: str
    password: str
    role: str
    firstname: str
    lastname: str
    address: str
    phone: str

class Plant(BaseModel):
    id: int
    name: str
    weight: float
    species: str
    # id_user: str


class Picture(BaseModel):
    id: int
    body: str

class Comment(BaseModel):
    id: int
    body: str
    id_user: int
    id_picture: int
    id_care: int

class Care(BaseModel):
    id: int
    date_start: date
    date_end: date
    id_pictures: int
    id_botanist: int
    id_plants : int    

@app.get("/")   
def test():
    return {"Hello": "World"}


@app.get('/user', response_model=List[User], status_code=status.HTTP_200_OK,tags=["User"])
def get_users(db: Session = Depends(get_db)):
    users=db.query(models.User).all()
    return users

@app.post('/user',response_model=User, status_code=status.HTTP_201_CREATED,tags=["User"])
def create_user(user:User, db: Session = Depends(get_db)):
    new_user=models.User(
    email = user.email,
    password = user.password,
    role = user.role,
    firstname = user.firstname,
    lastname = user.lastname,
    address = user.address,
    phone = user.phone,
    )
    db.add(new_user)
    db.commit()
    return new_user

@app.put("/user/{user_id}",response_model= User ,status_code=status.HTTP_200_OK, tags=["User"])
def update_user(user_id:int,user:User, db: Session = Depends(get_db)):

    user_to_update = db.query(models.User).filter(models.User.id==user_id).first()
    user_to_update.email = user.email
    user_to_update.role = user.role
    user_to_update.firstname = user.firstname
    user_to_update.lastname = user.lastname
    user_to_update.adress = user.address
    user_to_update.phone = user.phone
    
    db.commit()
    return user_to_update

@app.delete('/user/{user_id}',response_model=User, status_code=status.HTTP_200_OK,tags=["User"])
def delete_user(user_id:int, db: Session = Depends(get_db),):
    user_to_delete=db.query(models.User).filter(models.User.id==user_id).first()
    db.delete(user_to_delete)
    db.commit()
    return user_to_delete

@app.delete("/users", status_code=status.HTTP_204_NO_CONTENT, tags=["User"])
def delete_all_users(db: Session = Depends(get_db)):
    db.query(models.User).delete(synchronize_session=False)
    db.commit()
    return None

@app.get('/plants', response_model=List[Plant], status_code=status.HTTP_200_OK,tags=["Plant"])
def get_plants(db: Session = Depends(get_db)):
    plants=db.query(models.Plant).all()
    return plants


@app.post('/create_plant',response_model=Plant, status_code=status.HTTP_201_CREATED,tags=["Plant"])
def create_plant(plant:Plant, db: Session = Depends(get_db)):
    new_plant=models.Plant(
    name = plant.name,
    species = plant.species,
    weight = plant.weight
    )
    db.add(new_plant)
    db.commit()
    return new_plant

@app.get('/picture', response_model=List[Picture], status_code=status.HTTP_200_OK,tags=["Picture"])
def get_pics(db: Session = Depends(get_db)):
    pictures=db.query(models.Picture).all()
    return pictures

@app.post('/create_picture', response_model=Picture, status_code=status.HTTP_201_CREATED,tags=["Picture"])
def create_pic(picture:Picture, db: Session = Depends(get_db)):
    new_pic=models.Picture(
        body = picture.body
    )
    db.add(new_pic)
    db.commit()
    return new_pic

@app.post('/create_care', response_model=Care, status_code=status.HTTP_201_CREATED, tags=["Care"])
def create_care(care: Care, db: Session = Depends(get_db)):
    new_care = models.Care(
        date_start=care.date_start,
        date_end=care.date_end,
        id_pictures=care.id_pictures,
        id_botanist=care.id_botanist,
        id_plants=care.id_plants
    )
    db.add(new_care)
    db.commit()
    return new_care

@app.post('/create_comment', response_model=Comment, status_code=status.HTTP_201_CREATED,tags=["Comment"])
def create_com(comment:Comment, db: Session = Depends(get_db)):
    new_comment=models.Comment(
        body = comment.body,
        id_user = comment.id_user,
        id_picture = comment.id_picture,
        id_care = comment.id_care
    )
    db.add(new_comment)
    db.commit()
    return new_comment

@app.get('/comment/{id_care}', response_model=List[Comment], status_code=status.HTTP_200_OK, tags=["Comment"])
def get_comment_by_care(id_care: int, db: Session = Depends(get_db)):
    comments_by_care = db.query(models.Comment).filter(models.Comment.id_care == id_care).all()
    return comments_by_care
