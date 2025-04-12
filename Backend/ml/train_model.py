import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
import os

# Load dataset
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_PATH = os.path.join(BASE_DIR, "data", "Phishing_Websites_Data.csv")
df = pd.read_csv(DATA_PATH)

# Drop non-predictive or target leakage columns
X = df.drop(['Result'], axis=1)
y = df['Result']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Evaluate
print("Classification Report:\n", classification_report(y_test, model.predict(X_test)))

# Save model
MODEL_PATH = os.path.join(BASE_DIR, "ml", "phishing_model.pkl")
joblib.dump(model, MODEL_PATH)

