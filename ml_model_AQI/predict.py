import pickle

# Load the model from the .pkl file
with open('./model.pkl', 'rb') as file:
    model = pickle.load(file)

# Example input data (replace with your own input)
# Ensure the data format matches the model's input requirements
input_data = [[173,10,8,10,3]]  # Replace with actual feature values

# Use the model to predict the output
predictions = model.predict(input_data)

print("Predicted output:", predictions)
