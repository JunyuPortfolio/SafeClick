import requests
from urllib.parse import urlparse
from flask import jsonify

OLLAMA_URL = 'http://127.0.0.1:11434/api/generate'
def generate_response(prompt):
    try:
        response = requests.post(OLLAMA_URL, json={"prompt": prompt})
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

def check_url(url):
    # Dummy logic for now
    suspicious = "!" in url or "@" in url or len(url) > 100
    return {
        "url": url,
        "is_suspicious": suspicious,
        "reason": "Too long or contains suspicious characters" if suspicious else "Looks clean"
    }
