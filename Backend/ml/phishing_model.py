import joblib
import os
import numpy as np

# ✅ Use safe absolute path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "phishing_model.pkl")

# ✅ Load trained model
model = joblib.load(MODEL_PATH)

# ✅ Classify a feature vector (list of 9 int values)
def predict_from_features(feature_vector):
    proba = model.predict_proba([feature_vector])[0]
    pred = model.predict([feature_vector])[0]
    label = "malicious" if pred == 1 else "safe"
    confidence = round(max(proba) * 100, 2)  

    return {
        "prediction": label,
        "confidence": confidence
    }
