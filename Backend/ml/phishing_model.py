import os
import joblib
import numpy as np

# Use safe absolute path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "phishing_model.pkl")

# Load trained model
model = joblib.load(MODEL_PATH)

def predict_from_features(feature_vector):
    # Convert to 2D array for prediction
    X = [feature_vector]
    proba = model.predict_proba(X)[0]
    pred = model.predict(X)[0]
    confidence = round(max(proba) * 100, 2)

    # Interpret using thresholds
    if confidence < 70:
        label = "suspicious"
    else:
        label = "malicious" if pred == -1 else "safe"

    return {
        "prediction": label,
        "confidence": confidence
    }
