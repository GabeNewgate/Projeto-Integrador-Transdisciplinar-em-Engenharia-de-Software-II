from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.product import Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/products', methods=['GET'])
def get_products():
    """Obter todos os produtos disponíveis"""
    try:
        category = request.args.get('category')
        if category:
            products = Product.query.filter_by(category=category, available=True).all()
        else:
            products = Product.query.filter_by(available=True).all()
        
        return jsonify([product.to_dict() for product in products]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Obter um produto específico"""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    """Obter todas as categorias disponíveis"""
    try:
        categories = db.session.query(Product.category).distinct().all()
        return jsonify([category[0] for category in categories]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

