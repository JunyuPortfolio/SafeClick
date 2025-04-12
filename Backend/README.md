# OCR Text Extraction API

A Flask-based API that extracts text from images using Tesseract OCR.

## Prerequisites

1. Python 3.8 or higher
2. Tesseract OCR

## Installation

1. Install Tesseract OCR:
   - Windows: Download installer from [UB-Mannheim/tesseract](https://github.com/UB-Mannheim/tesseract/wiki)
   - Linux: `sudo apt-get install tesseract-ocr`
   - Mac: `brew install tesseract`

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure Tesseract path (choose one):
   - Add Tesseract installation directory to PATH
   - Set TESSERACT_PATH environment variable to point to tesseract.exe
   - Install Tesseract in a standard location (Program Files)

## Usage

1. Start the server:
   ```bash
   python app.py
   ```

2. Send a POST request to `/ocr` endpoint:
   - URL: `http://localhost:5000/ocr`
   - Method: POST
   - Body: form-data with key 'image' and an image file
   - Supported image formats: PNG, JPG, JPEG, GIF, BMP, TIFF

3. Response format:
   ```json
   {
       "extracted_text": "Text found in the image"
   }
   ```

   Error response:
   ```json
   {
       "error": "Error message"
   }
   ```

## Environment Variables

- `TESSERACT_PATH`: Optional. Full path to tesseract executable
- `FLASK_ENV`: Set to 'development' for debug mode
- `PORT`: Optional. Port number (default: 5000)

## Error Handling

The API includes comprehensive error handling for:
- Missing files
- Invalid file types
- OCR processing errors
- File system errors

## Development

The code includes:
- Logging for debugging
- Clean temporary file handling
- Security measures (secure filenames)
- Cross-platform compatibility 