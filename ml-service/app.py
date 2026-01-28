from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'message': 'FitHub ML Service is running',
        'version': '1.0.0'
    })

@app.route('/api/ml/recommend', methods=['POST'])
def get_recommendations():
    """
    Get product recommendations based on product ID
    Request body: { "product_id": "sku-123", "limit": 5 }
    """
    try:
        data = request.get_json()
        product_id = data.get('product_id')
        limit = data.get('limit', 5)
        
        # TODO: Implement recommendation logic from Recommendations.ipynb
        # For now, return placeholder
        return jsonify({
            'success': True,
            'product_id': product_id,
            'recommendations': [
                {
                    'sku': 'placeholder-1',
                    'name': 'Recommended Product 1',
                    'similarity_score': 0.95
                }
            ]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/ml/segment', methods=['POST'])
def get_customer_segment():
    """
    Get customer segment based on user behavior
    Request body: { "user_id": "user-123", "features": {...} }
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        # TODO: Implement segmentation logic from customer_segmentation.ipynb
        return jsonify({
            'success': True,
            'user_id': user_id,
            'segment': 'active_buyer',
            'confidence': 0.87
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    debug = os.getenv('DEBUG', 'True') == 'True'
    app.run(host='0.0.0.0', port=port, debug=debug)
