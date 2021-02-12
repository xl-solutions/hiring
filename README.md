# :computer: Technologies
Website that consume REST API,  to store and search information about the stocks quotes and history.

### BACKEND
```
* [JavaScript]
* [NodeJs]   
* [HTML+CSS]   
```

###### :hammer: Run API Project
```bash
# Install Dependencies
$ yarn install

# Run Aplication
$ yarn run start-api

```
Go to http://localhost:3001/ and see the result with the Requests URL.

###### :pager: Request URL
```bash
#ENDPOINTS:

*GET| http://localhost:3001/stocks/:stock_name/quote    | ("Return the Stock Quote")

*GET| http://localhost:3001/stocks/:stock_name/history  | ("Return the history of Stocks")

*GET| http://localhost:3001/stocks/:stock_name/compare | ("Compare Stocks")
JSON: {attributes: [atr1, atr2, atr3]}

*GET| | 
```


---

### FRONTEND
```
* [JavaScript]
* [ReactJs]   
* [HTML+CSS]   
```

###### :hammer: Run Web Project
```bash
# Install Dependencies
$ yarn install

# Run Aplication
$ yarn run start-web
```
Go to http://localhost:3000/ and see the result.


---
### TEST
```bash
# Run the tests
$ cd backend/ yarn test
```



:closed_book: Released in February 2021