# The Solution

This README shows the [Quick Start](#how-to-use) to get the software running, then reveals the [Data Modeling](#data-modeling) of the project, and finally presents what can be improved in the [Future and Improvements](#future-and-improvements) section.

## How to Use

This project makes use of [Pipenv] as its virtual environment and package manager. Install it with `pip install pipenv` and you are good to go.

```sh
# First, run the setup.sh script to create the basic directories and files
./setup.sh # you know you should read its content beforehand, right?

# With pipenv installed, change directory to the `solution` folder and run:
pipenv sync

# To initialize the sqlite db
pipenv run python main.py

# run the tests
pipenv run pytest -v

# run the application itself
pipenv run flask run
```

## Data Modeling

The only data model used here was [Product Model], with all properties in it, for the simplicity of a first iteration.

The Product Model entity.

| Property          | Property Type |
|---                |---            |
| **id**            | Integer       |
| manufacturer      | Varchar(50)   |
| model             | Varchar(80)   |
| color             | Varchar(10)   |
| carrier_plan_type | Varchar(3)    |
| quantity          | Integer       |
| price             | Decimal(7,2)  |

## Future and Improvements

Here are a listing of improvements this project needs (unordered):

- Change the database system for one production-ready, with more features and more robust, like PostgreSQL;
- Fix the [Data Modeling](#data-modeling), spliting the `Product Model` in more entities (i.e. Manufacturer could be its own entity, as well as Carrier Plan Type);
- Improve error handling on `BulkStock.update_stock_db()` method (actually improve the entire method);
- Continue developing tests including acceptances tests

[pipenv installation]: https://github.com/pypa/pipenv#installation
[Pipenv]: https://github.com/pypa/pipenv
[Product Model]: stock/models.py
