from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
import pandas as pd


class AirQuality(BaseModel):
    pm25: float
    no2: float
    co: float
    so2: float
    o3: float

app = FastAPI()


origins = [
    "http://localhost:3006"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(AirQuality: AirQuality):
    pm25 = AirQuality.pm25
    no2 = AirQuality.no2
    co = AirQuality.co
    so2 = AirQuality.so2
    o3 = AirQuality.o3
    model = pickle.load(open("../ml_model_AQI/model.pkl", "rb"))
    
    pred = model.predict([[pm25, no2, co, so2, o3]])
    res=round(pred[0],2)
    print(pred)
    return {res}