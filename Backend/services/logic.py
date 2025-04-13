import re
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup

OLLAMA_URL = 'http://localhost:11434/api/generate'

def duckduckgo_check(domain):
    import requests
    from bs4 import BeautifulSoup

    query = f"https://duckduckgo.com/html/?q={domain}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        resp = requests.get(query, headers=headers)
        soup = BeautifulSoup(resp.text, "html.parser")

        snippets = " ".join([result.text for result in soup.select(".result__snippet")])
        keywords = ["scam", "fraud", "fake", "phishing", "complaint", "not legit", "ripoff"]
        found = [k for k in keywords if k in snippets.lower()]

        return {
            "is_suspicious": len(found) >= 2,
            "matched_keywords": found
        }

    except Exception as e:
        return {
            "is_suspicious": False,
            "matched_keywords": [],
            "error": str(e)
        }


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

    # --- Step 1: DuckDuckGo keyword check ---
    duck_result = duckduckgo_check(domain)
    search_summary = ""
    if duck_result["is_suspicious"]:
        search_summary = (
            f"\nSearch engine results indicate the domain may be suspicious. "
            f"Found keywords: {', '.join(duck_result['matched_keywords'])}.\n"
        )

    # --- Step 2: Fetch website content ---
    website_text = fetch_website_text(url)

    # --- Step 3: Create prompt for Ollama ---
    prompt = f"""
You are a cybersecurity AI assistant helping users evaluate the safety and legitimacy of websites.

A user has asked you to analyze this domain: {url}

Your tasks are:
1. Analyze the domain name structure and determine if it appears to impersonate a legitimate organization (e.g., government agency, company, university, or service).
2. Judge if the domain name uses typosquatting, brand impersonation, or misleading patterns to appear trustworthy.
3. Determine from online search results and website content whether the site is linked to known scams or phishing behavior.
4. Say whether it appears to be from an official or trustworthy source — or is pretending to be.
5. Summarize all findings clearly in a short paragraph, including why the site is or is not trustworthy.

Search engine findings:
{search_summary or "No clear scam indicators were found in web search."}

Website content:
---
{website_text[:4000]}
---

Give your assessment now.
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

#