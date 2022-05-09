from os import path
from flask import url_for


def test_acess_page_upload(client):
    response = client.get(url_for('inventory_bp.home_inventory'))

    assert response.status_code == 200
