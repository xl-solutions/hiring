FROM python:3.8-slim-buster
COPY requirements.txt /
RUN pip install -r requirements.txt
WORKDIR /webapp

COPY online_store/ /webapp/
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
CMD flask run -h 0.0.0.0 -p 5000