from flask import Blueprint, request, jsonify
from services.url_features import extract_features_from_url, FEATURE_NAMES
from ml.phishing_model import predict_from_features

api_bp = Blueprint("api", __name__)

@api_bp.route("/check_url", methods=["POST"])
def check_url():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        features = extract_features_from_url(url)
        result = predict_from_features(features)

        # Make the feature output LLM-friendly
        feature_dict = dict(zip(FEATURE_NAMES, features))

        return jsonify({
            "url": url,
            "features": feature_dict,
            "prediction": result["prediction"],
            "confidence": f"{result['confidence']}%"  # Converted to percentage
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
