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

api_bp = Blueprint("api", __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@api_bp.route("/check_url", methods=["POST"])
def check_url():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        # Extract features & run ML prediction
        features = extract_features_from_url(url)
        result = predict_from_features(features)
        feature_dict = dict(zip(FEATURE_NAMES, features))

        # Run LLM logic to get report
        llm_result = generate_response(url)
        llm_summary = llm_result.get("summary", "LLM response unavailable")

        # Return all in one response
        return jsonify({
            "url": url,
            "features": feature_dict,
            "prediction": result["prediction"],
            "confidence": f"{result['confidence']}%",
            "llm_report": llm_summary
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def allowed_image_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

@api_bp.route('/upload_image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_image_file(file.filename):
        timestamp = int(time.time())
        filename = f"{timestamp}_{secure_filename(file.filename)}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        try:
            # OCR
            image = Image.open(filepath)
            text = pytesseract.image_to_string(image)

            # Extract URLs using regex
            url_pattern = r'((https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?)'
            urls = re.findall(url_pattern, text)
            urls = [match[0] for match in urls if match[0]]

            # Return the response before deleting the file
            return jsonify({
                "text": text,
                "urls": urls,
                "file": filename,
                "message": "Image processed and OCR completed"
            }), 200

        except Exception as e:
            return jsonify({'error': f"OCR failed: {str(e)}"}), 500

        finally:
            # Always delete the file
            if os.path.exists(filepath):
                os.remove(filepath)

    else:
        return jsonify({'error': 'Invalid image file type'}), 400
