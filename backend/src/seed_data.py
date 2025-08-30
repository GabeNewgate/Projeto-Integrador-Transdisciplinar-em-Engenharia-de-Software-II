#!/usr/bin/env python3
"""
Script para popular o banco de dados com produtos de exemplo
"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.models.user import db
from src.models.product import Product
from src.models.admin import Admin
from src.main import app

def seed_products():
    """Adiciona produtos de exemplo ao banco de dados"""
    
    # Produtos Doces
    doces = [
        {
            'name': 'Cupcake de Chocolate',
            'description': 'Delicioso cupcake de chocolate com cobertura cremosa',
            'price': 8.50,
            'category': 'Doce',
            'image_url': '/static/images/chocolate.jpg'
        },
        {
            'name': 'Cupcake de Baunilha',
            'description': 'Cupcake clássico de baunilha com glacê colorido',
            'price': 7.50,
            'category': 'Doce',
            'image_url': '/static/images/baunilha.jpg'
        },
        {
            'name': 'Cupcake Red Velvet',
            'description': 'Cupcake red velvet com cream cheese',
            'price': 9.00,
            'category': 'Doce',
            'image_url': '/static/images/red_velvet.jpg'
        },
        {
            'name': 'Cupcake de Morango',
            'description': 'Cupcake com recheio de morango e chantilly',
            'price': 8.00,
            'category': 'Doce',
            'image_url': '/static/images/morango.jpg'
        }
    ]
    
    # Produtos Salgados
    salgados = [
        {
            'name': 'Cupcake de Frango',
            'description': 'Cupcake salgado com frango desfiado e catupiry',
            'price': 10.00,
            'category': 'Salgado',
            'image_url': '/static/images/frango.jpg'
        },
        {
            'name': 'Cupcake de Queijo',
            'description': 'Cupcake com massa de queijo e ervas finas',
            'price': 9.50,
            'category': 'Salgado',
            'image_url': '/static/images/queijo.jpg'
        },
        {
            'name': 'Cupcake de Presunto e Queijo',
            'description': 'Cupcake recheado com presunto e queijo derretido',
            'price': 11.00,
            'category': 'Salgado',
            'image_url': '/static/images/presunto_queijo.jpg'
        }
    ]
    
    # Produtos Fit
    fit = [
        {
            'name': 'Cupcake Integral de Banana',
            'description': 'Cupcake integral com banana e aveia, sem açúcar',
            'price': 9.50,
            'category': 'Fit',
            'image_url': '/static/images/banana_fit.jpg'
        },
        {
            'name': 'Cupcake Proteico de Chocolate',
            'description': 'Cupcake com whey protein e cacau 100%',
            'price': 12.00,
            'category': 'Fit',
            'image_url': '/static/images/chocolate_fit.jpg'
        },
        {
            'name': 'Cupcake de Cenoura Fit',
            'description': 'Cupcake de cenoura sem glúten e sem lactose',
            'price': 10.50,
            'category': 'Fit',
            'image_url': '/static/images/cenoura_fit.jpg'
        }
    ]
    
    all_products = doces + salgados + fit
    
    with app.app_context():
        # Verificar se já existem produtos
        if Product.query.first():
            print("Produtos já existem no banco de dados.")
            return
        
        # Adicionar produtos
        for product_data in all_products:
            product = Product(**product_data)
            db.session.add(product)
        
        db.session.commit()
        print(f"Adicionados {len(all_products)} produtos ao banco de dados.")

if __name__ == '__main__':
    seed_products()

