FEATURE_NAMES = [
    "having_IP_Address", "URL_Length", "Shortening_Service", 
    "having_At_Symbol", "double_slash_redirecting", "Prefix_Suffix",
    "having_Sub_Domain", "SSLfinal_State", "Domain_registeration_length",
    "Favicon", "port", "HTTPS_token", "Request_URL", "URL_of_Anchor",
    "Links_in_tags", "SFH", "Submitting_to_email", "Abnormal_URL",
    "Redirect", "on_mouseover", "RightClick", "popUpWidnow",
    "Iframe", "age_of_domain", "DNSRecord", "web_traffic",
    "Page_Rank", "Google_Index", "Links_pointing_to_page",
    "Statistical_report"
]
import re
import requests
import socket
import tldextract
from urllib.parse import urlparse
from bs4 import BeautifulSoup

def extract_features_from_url(url):
    features = []

    # Safely get HTML content
    try:
        response = requests.get(url, timeout=5)
        html = response.text
    except:
        html = ""

    # Parse domain
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    extracted = tldextract.extract(url)
    full_domain = f"{extracted.domain}.{extracted.suffix}"

    def has_ip():
        return 1 if re.match(r'^(?:\d{1,3}\.){3}\d{1,3}$', domain) else -1

    def url_length():
        return 1 if len(url) >= 75 else 0 if len(url) >= 54 else -1

    def shortening_service():
        return 1 if re.search(r"bit\.ly|goo\.gl|tinyurl|ow\.ly|t\.co", url) else -1

    def at_symbol():
        return 1 if '@' in url else -1

    def double_slash_redirecting():
        return 1 if url.rfind('//') > 6 else -1

    def prefix_suffix():
        return 1 if '-' in domain else -1

    def sub_domain():
        dots = domain.count('.')
        return 1 if dots >= 3 else 0 if dots == 2 else -1

    def ssl_final_state():
        return 1 if url.startswith("https://") else -1

    # For now, simulate the rest with safe defaults or simple logic
    def default_1(): return 1
    def default_0(): return 0
    def default_minus1(): return -1

    # Add features in order
    features.extend([
        has_ip(),                       # Having_IP_Address
        url_length(),                   # URL_Length
        shortening_service(),           # Shortining_Service
        at_symbol(),                    # Having_At_Symbol
        double_slash_redirecting(),     # Double_slash_redirecting
        prefix_suffix(),                # Prefix_Suffix
        sub_domain(),                   # Having_Sub_Domain
        ssl_final_state(),              # SSLfinal_State
        default_minus1(),               # Domain_registeration_length (requires WHOIS)
        default_1(),                    # Favicon
        default_minus1(),               # Port
        default_1(),                    # HTTPS_token
        default_minus1(),               # Request_URL
        default_minus1(),               # URL_of_Anchor
        default_minus1(),               # Links_in_tags
        default_minus1(),               # SFH
        default_minus1(),               # Submitting_to_email
        default_minus1(),               # Abnormal_URL
        default_minus1(),               # Redirect
        default_minus1(),               # on_mouseover
        default_minus1(),               # RightClick
        default_minus1(),               # popUpWidnow
        default_minus1(),               # Iframe
        default_minus1(),               # Age_of_Domain (requires WHOIS)
        default_minus1(),               # DNSRecord (requires WHOIS)
        default_minus1(),               # Web_Traffic (requires Alexa ranking)
        default_minus1(),               # Page_Rank (requires external API)
        default_minus1(),               # Google_Index (could use search API)
        default_minus1(),               # Links_pointing_to_page
        default_minus1(),               # Statistical_report
    ])

    return features
