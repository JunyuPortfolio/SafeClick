from flask import Blueprint, request, jsonify
from services.url_features import extract_features_from_url, FEATURE_NAMES
from ml.phishing_model import predict_from_features
from services.logic import generate_response  # ← Add this import

api_bp = Blueprint("api", __name__)

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
