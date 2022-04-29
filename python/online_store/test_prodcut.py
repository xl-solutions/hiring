import unittest
import os
from io import BytesIO

from flask_testing import TestCase
from flask import abort, url_for
from app import create_app, database
from database.database import db

import pandas as pd
import datatest as dt

# from app.models import Employee, Department, Role

class TestBase(TestCase):

	def create_app(self):

		#pass in test configurations 
		config_name = 'testing'
		app = create_app()
		app.config.update(SQLALCHEMY_DATABASE_URI='sqlite:///teste.db')
		return app

	def setUp (self):
		"""
		Will be called before every test
		"""

		db.create_all()


	def tearDown(self):
		"""
		Will be called after every test 
		"""

		db.session.remove()
		db.drop_all()



class TestViews(TestBase):

	def test_list_view(self):
		"""
		Test that list is accessible
		"""
		response = self.client.get(url_for('product.list'))
		self.assertEqual(response.status_code, 200)

	def test_import_view(self):
		"""
		Test that login page is accessible without login
		"""
		response = self.client.get(url_for('product.upload_files'))
		self.assertEqual(response.status_code, 200)

	def test_upload_file(self):

		data = dict(file=(BytesIO(b'test'), 'test_file.csv'))

		response = self.client.post(url_for('product.upload_files'), data=data, 
												content_type='multipart/form-data',
												follow_redirects=True)

		self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
	unittest.main()