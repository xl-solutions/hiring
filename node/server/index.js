require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
