FROM python

WORKDIR /usr/src/flask_uuid

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]