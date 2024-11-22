from fastapi import FastAPI
from pydantic import BaseModel
from pyspark.sql import SparkSession
from pyspark.ml import PipelineModel
import pandas as pd

# Initialize Spark Session
spark = SparkSession.builder \
    .appName("FastAPI_Prediction") \
    .getOrCreate()

# Load the unzipped PySpark model
model = PipelineModel.load("../WQIPredictor")  # Replace with the path to your unzipped model

# Create FastAPI app
app = FastAPI()

# Define input data schema using Pydantic
class InputData(BaseModel):
    npH: float
    ndo: float
    nec: float
    nna: float

@app.post("/predict")
def predict(data: InputData):
    # Convert input data to pandas DataFrame
    input_data = pd.DataFrame([data.dict()])
    
    # Convert the pandas DataFrame to a Spark DataFrame
    spark_df = spark.createDataFrame(input_data)
    
    # Run the model's prediction
    predictions = model.transform(spark_df)
    
    # Extract the predicted value
    result = predictions.select("prediction").collect()
    
    # Return the prediction in the response
    return {"prediction": result[0]["prediction"]}
