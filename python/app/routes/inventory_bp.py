from flask import Blueprint
from app.controllers.inventory_controller import home_inventory,list_inventory,upload_products_inventory

inventory_bp = Blueprint('inventory_bp', __name__)

inventory_bp.route('/', methods=['GET'])(home_inventory)
inventory_bp.route('/inventory/', methods=['GET'])(list_inventory)
inventory_bp.route('/inventory/upload', methods=['POST'])(upload_products_inventory)