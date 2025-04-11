from flask import Blueprint, request, jsonify
from services.logic import check_url, generate_response

api_bp = Blueprint('api', __name__)

@api_bp.route('/check_url', methods=['POST'])
def check_url_route():
    data = request.get_json()
    url = data.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    result = generate_response(url)
    return jsonify(result)
