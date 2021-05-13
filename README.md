## 📌 Content

- [About](#-about)
- [Technology](#-technology)
- [Installation and Configuration](#installation-and-configuration)
   - [Docker](#docker)
   - [Virtual environment](#virtual-environment)
   - [Database](#database)
   - [Installation of Dependencies](#installation-of-dependencies)
   - [Flask Env](#flask-env)
- [Running the Application](#gear-running-the-application)

## 🚀 About

This repository contains the source code of the application developed for the test [Python flask test](https://github.com/xl-solutions/hiring/blob/master/python/README.md)


## 💻 Technology

- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [pip](https://pypi.org/project/pip/)
- [Wtforms](https://wtforms.readthedocs.io/en/2.3.x/)
- [Dynaconf](https://www.dynaconf.com/)
- [Postgres](https://www.postgresql.org/)
- [Flask SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🛠️ Installation and Configuration

To execute the project in a development environment, it is necessary to have the tools installed. Can be consulted in the technology section

### Docker

This project can be carried out using docker technology

```bash
docker-compose up
```

### Virtual environment

It is also possible to execute this project using [virtual development environment](https://docs.python.org/3/library/venv.html)

### Database

Required has the most updated version of [postgres] (https://www.postgresql.org/). Change the `SQLALCHEMY_DATABASE_URI` variable in the `settings.toml` configuration file

```toml
SQLALCHEMY_DATABASE_URI = 'postgresql://docker:xlsolution@database/xlsolution'
```

### Installation of Dependencies

Run the command to perform the dependency installation

```bash
pip install -r requirements.txt
```

### Flask Env

It is necessary to configure the flask environment variables with the values `FLASK_ENV='development'` e `FLASK_APP=app/app.py`


## :gear: Running the Application

If the application is run by the docker, simply run the `docker-compose up` command and then access the application via the address
[http://localhost:5000/](http://localhost:5000/)

If the application was executed locally with a virtual environment. Run the command below after installing the dependencies

```bash
flask run
```

---
Developed :blue_heart: by  Fredson Chaves