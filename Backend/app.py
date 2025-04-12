from flask import Flask
from routes.api import api_bp

app = Flask(__name__)
app.register_blueprint(api_bp, url_prefix="/api")

if __name__ == '__main__':
    app.run(app.run(ssl_context=('cert.pem', 'key.pem'), debug=True), debug=True)
