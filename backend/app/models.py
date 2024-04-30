from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import relationship
from db import Base


class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    address = Column(String)
    phone = Column(String)

    # plants = relationship("Plants", back_populates="user")
    comments = relationship("Comment")
    cares = relationship("Care")

class Plant(Base):
    __tablename__ = 'plants'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    weight = Column(Float)
    species = Column(String)
    # id_user = Column(Integer, ForeignKey("users.id"))

    # user = relationship("User", back_populates="plant")
    cares = relationship("Care", back_populates="plant")


class Picture(Base):
    __tablename__ = 'pictures'
    
    id = Column(Integer, primary_key=True, index=True)
    body = Column(String)

    comments = relationship("Comment", back_populates="picture")
    cares = relationship("Care", back_populates="picture")

class Care(Base):
    __tablename__ = 'cares'
    
    id = Column(Integer, primary_key=True, index=True)
    date_start = Column(Date)
    date_end = Column(Date)
    id_pictures = Column(Integer, ForeignKey('pictures.id'))
    id_botanist = Column(Integer, ForeignKey('users.id'))
    id_plants = Column(Integer, ForeignKey('plants.id'))
    
    picture = relationship("Picture", back_populates="cares")
    # users = relationship("User", back_populates="cares")
    plant = relationship("Plant", back_populates="cares")
    comments = relationship("Comment", back_populates="care")


class Comment(Base):
    __tablename__ = 'comments'
    
    id = Column(Integer, primary_key=True, index=True)
    body = Column(String)
    id_user = Column(Integer, ForeignKey('users.id'))
    id_picture = Column(Integer, ForeignKey('pictures.id'))
    id_care = Column(Integer, ForeignKey('cares.id')) 

    picture = relationship("Picture", back_populates="comments")
    user = relationship("User", back_populates="comments")
    care = relationship("Care", back_populates="comments")


# class Own(Base):
#     __tablename__ = 'own'
    
#     user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
#     plant_id = Column(Integer, ForeignKey('plants.id'), primary_key=True)
    
#     user = relationship("User", back_populates="plants")
#     plant = relationship("Plant", back_populates="owners")
