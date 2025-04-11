import re
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup

OLLAMA_URL = 'http://localhost:11434/api/generate'

def fetch_website_text(url):
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "http://" + url  # Add default scheme if missing
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.get_text(separator='\n', strip=True)
    except Exception as e:
        return f"[Error fetching website: {e}]"

def extract_summary(response_text):
    # Remove <think>...</think> block if it exists
    return re.sub(r"<think>.*?</think>\s*", "", response_text, flags=re.DOTALL).strip()

def generate_response(url):
    parsed = urlparse(url)
    domain = parsed.netloc or parsed.path  # fallback if scheme is missing

    # Fetch website content
    website_text = fetch_website_text(url)

    # Prompt for LLM: no pre-judgment, just raw data
    prompt = f"""
You are a cybersecurity AI assistant. A user visited this website: {url}

Your task is to:
1. Determine if the domain name itself looks suspicious or like it might be impersonating a well-known brand (e.g., through typos or misleading structure).
2. Analyze the website's content and say whether it looks like a phishing, spam, scam, or suspicious site.

Website content:
---
{website_text[:4000]}
---

Give a short, clear summary combining your judgment of the URL and the content.
"""

    payload = {
        "model": "deepseek-r1:latest",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        raw_text = response.json().get("response", "")
        return {"summary": extract_summary(raw_text)}
    except requests.RequestException as e:
        return {"error": str(e)}
