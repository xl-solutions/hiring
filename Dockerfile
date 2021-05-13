FROM python:3

WORKDIR /usr/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_APP=app/app.py

ENTRYPOINT ["./entrypoint.sh"]