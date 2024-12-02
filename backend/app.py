from fastapi import FastAPI
import joblib  # Or tensorflow/torch depending on the model
from pydantic import BaseModel

app = FastAPI()

# Load your model
model = joblib.load("models/xgboost_model_odi.pkl")

@app.get("/")
def read_root():
    return {"message": "Model API is live!"}

class InputData(BaseModel):
    feature1: float
    feature2: float
    feature3: float

@app.post("/predict")
def predict(data: InputData):
    input_data = [[data.feature1, data.feature2, data.feature3]]
    prediction = model.predict(input_data)

    return {"prediction": prediction[0]}