from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.order import Order, OrderItem
from src.models.product import Product

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/orders', methods=['POST'])
def create_order():
    """Criar um novo pedido"""
    try:
        data = request.get_json()
        
        # Validar dados obrigatórios
        required_fields = ['customer_name', 'customer_email', 'customer_phone', 'items']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo obrigatório: {field}'}), 400
        
        # Criar o pedido
        order = Order(
            customer_name=data['customer_name'],
            customer_email=data['customer_email'],
            customer_phone=data['customer_phone'],
            total_amount=0
        )
        
        db.session.add(order)
        db.session.flush()  # Para obter o ID do pedido
        
        total_amount = 0
        
        # Adicionar itens do pedido
        for item_data in data['items']:
            product = Product.query.get(item_data['product_id'])
            if not product:
                return jsonify({'error': f'Produto não encontrado: {item_data["product_id"]}'}), 404
            
            if not product.available:
                return jsonify({'error': f'Produto não disponível: {product.name}'}), 400
            
            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item_data['quantity'],
                unit_price=product.price
            )
            
            total_amount += product.price * item_data['quantity']
            db.session.add(order_item)
        
        # Atualizar o total do pedido
        order.total_amount = total_amount
        db.session.commit()
        
        return jsonify(order.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders', methods=['GET'])
def get_orders():
    """Obter todos os pedidos (para admin)"""
    try:
        orders = Order.query.order_by(Order.created_at.desc()).all()
        return jsonify([order.to_dict() for order in orders]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Obter um pedido específico"""
    try:
        order = Order.query.get_or_404(order_id)
        return jsonify(order.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """Atualizar o status de um pedido (para admin)"""
    try:
        data = request.get_json()
        order = Order.query.get_or_404(order_id)
        
        if 'status' not in data:
            return jsonify({'error': 'Status é obrigatório'}), 400
        
        valid_statuses = ['Pendente', 'Confirmado', 'Em Preparo', 'Pronto', 'Entregue']
        if data['status'] not in valid_statuses:
            return jsonify({'error': 'Status inválido'}), 400
        
        order.status = data['status']
        db.session.commit()
        
        return jsonify(order.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

