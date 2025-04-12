from flask import Blueprint, request, jsonify
from services.url_features import extract_features_from_url, FEATURE_NAMES
from ml.phishing_model import predict_from_features
from services.logic import generate_response
import os
from werkzeug.utils import secure_filename
from PIL import Image
import pytesseract
import time
import re
from urllib.parse import urlparse
import tldextract
from flask_cors import CORS
UPLOAD_FOLDER = 'uploads'
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def validate_llm_output(llm_text):
    """
    Validates and sanitizes the LLM output to prevent potential security issues.
    Uses a comprehensive approach to ensure outputs can't be used for XSS or other attacks.
    """
    if not isinstance(llm_text, str):
        return "Invalid LLM response format"
    
    if len(llm_text) > 10000:  # Maximum reasonable size
        return "LLM response too large"
    
    # First remove any HTML tags completely
    sanitized = re.sub(r'<[^>]*>', '', llm_text)
    
    # Manually escape HTML special characters
    sanitized = sanitized.replace('&', '&amp;')
    sanitized = sanitized.replace('<', '&lt;')
    sanitized = sanitized.replace('>', '&gt;')
    sanitized = sanitized.replace('"', '&quot;')
    sanitized = sanitized.replace("'", '&#x27;')
    try:
        domain_part = url.split('://', 1)[1].split('/', 1)[0].split(':', 1)[0]  # Handle ports
        
        # Check if domain is an IP address
        ip_pattern = r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)
    """
    if not isinstance(llm_text, str):
        return "Invalid LLM response format"
    
    if len(llm_text) > 10000:  # Maximum reasonable size
    
    # Check URL length to prevent DoS
    if len(url) > 2048:
        return jsonify({"error": "URL exceeds maximum allowed length"}), 400
        
    # Basic protocol validation
    if not url.startswith(('http://', 'https://')):
        return jsonify({"error": "URL must use HTTP or HTTPS protocol"}), 400
    
    # Extract and validate domain
    try:
        domain_part = url.split('://', 1)[1].split('/', 1)[0].split(':', 1)[0]  # Handle ports
        
        # Check if domain is an IP address
        ip_pattern = r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
        is_ip = bool(re.match(ip_pattern, domain_part))
        
        # If not an IP, ensure it has a valid domain format
        if not is_ip and (not domain_part or '.' not in domain_part or len(domain_part.split('.')) < 2):
            return jsonify({"error": "Invalid domain in URL"}), 400
    except Exception:
        return jsonify({"error": "Invalid URL format"}), 400

    try:
        # Extract features & run ML prediction
        features = extract_features_from_url(url)
        result = predict_from_features(features)
        feature_dict = dict(zip(FEATURE_NAMES, features))
        
        # Run LLM logic to get report
        llm_result = generate_response(url)
        llm_summary = llm_result.get("summary", "LLM response unavailable")
        
        # Validate and sanitize LLM output before using it
        sanitized_summary = validate_llm_output(llm_summary)

        # Return all in one response
        return jsonify({
            "url": url,
            "features": feature_dict,
            "prediction": result["prediction"],
            "confidence": f"{result['confidence']}%",
            "llm_report": sanitized_summary
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# WHITELIST = {
#     "google.com",
#     "wikipedia.org",
#     "github.com",
#     "apple.com",
#     "microsoft.com",
#     "amazon.com"
# }

def allowed_image_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

@api_bp.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400


def allowed_image_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

def validate_image_content(file):
    """
    Verifies that the file content is actually a valid image.
    This helps prevent malicious file uploads with fake extensions.
    """
    try:
        # Check if it's a valid image by opening it with PIL
        img = Image.open(file)
        img.verify()  # Verify it's a valid image
        file.seek(0)  # Reset file pointer for future operations
        return True
    except Exception:
        return False

@api_bp.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400
    else:
        return jsonify({'error': 'Invalid image file type'}), 400
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_image_file(file.filename):
        # Verify the actual file content before saving
        if not validate_image_content(file):
            return jsonify({'error': 'Invalid image content or potential malicious file'}), 400
            
        timestamp = int(time.time())
        filename = f"{timestamp}_{secure_filename(file.filename)}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
                    "text": text,
                    "urls": [],
                    "message": "No URL found in image."
                }), 200

            selected_url = urls[0]
            result = check_url_logic(selected_url)

            return jsonify({
                "text": text,
                "urls": urls,
                "selected_url": selected_url,
                **result,
                "message": "Image processed, URL scanned, and results returned"
            }), 200

        except Exception as e:
            return jsonify({'error': f"OCR or LLM failed: {str(e)}"}), 500

        finally:
            if os.path.exists(filepath):
                os.remove(filepath)

    else:
        return jsonify({'error': 'Invalid image file type'}), 400

            if os.path.exists(filepath):
                os.remove(filepath)

    else:
        return jsonify({'error': 'Invalid image file type'}), 400