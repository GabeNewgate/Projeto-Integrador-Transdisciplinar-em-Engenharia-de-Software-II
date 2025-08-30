from flask import Blueprint, request, jsonify, session
from src.models.user import db
from src.models.admin import Admin

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/admin/login', methods=['POST'])
def admin_login():
    """Login do administrador"""
    try:
        data = request.get_json()
        
        if 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Username e password são obrigatórios'}), 400
        
        admin = Admin.query.filter_by(username=data['username']).first()
        
        if admin and admin.check_password(data['password']):
            session['admin_id'] = admin.id
            session['admin_username'] = admin.username
            return jsonify({
                'message': 'Login realizado com sucesso',
                'admin': admin.to_dict()
            }), 200
        else:
            return jsonify({'error': 'Credenciais inválidas'}), 401
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/admin/logout', methods=['POST'])
def admin_logout():
    """Logout do administrador"""
    try:
        session.pop('admin_id', None)
        session.pop('admin_username', None)
        return jsonify({'message': 'Logout realizado com sucesso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/admin/check', methods=['GET'])
def check_admin_session():
    """Verificar se o admin está logado"""
    try:
        if 'admin_id' in session:
            admin = Admin.query.get(session['admin_id'])
            if admin:
                return jsonify({
                    'logged_in': True,
                    'admin': admin.to_dict()
                }), 200
        
        return jsonify({'logged_in': False}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def require_admin():
    """Decorator para verificar se o usuário é admin"""
    def decorator(f):
        def wrapper(*args, **kwargs):
            if 'admin_id' not in session:
                return jsonify({'error': 'Acesso negado. Login de admin necessário.'}), 403
            return f(*args, **kwargs)
        wrapper.__name__ = f.__name__
        return wrapper
    return decorator

