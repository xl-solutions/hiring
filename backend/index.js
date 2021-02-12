const express = require('express');
const api = express();
const port = 3001;
const routes = require('./routes.js')

api.use(express.json());
api.use(routes);


api.listen(port, ()=> {
    console.log(`Server listen on port ${port}`);
})
