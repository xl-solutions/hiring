const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = process.env.PORT || 3333
const app = express();


app.use(cors({ origin: true }))


//Para o express entender informaçoes em json
app.use(bodyParser.json());

//Para entender URL por parametros
app.use(bodyParser.urlencoded({ extended: false }));


//Importando todos os controllers
//Importando todos os controllers
require('./controllers/index.js')(app);


//Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});

