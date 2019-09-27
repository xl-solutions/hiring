/* Classe para rotas */
const express = require("express");
const server = express();

/* Classe para conexao com o banco */
/*
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://desenv:teamy4426@cluster0-fjglp.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
*/

/* Classe para a API ser consultada por qualquer um */
const cors = require("cors");

/* Classe com minhas configuracoes de rota */
const rotas = require("./routes");

server.use(cors());
/* Metodo que permite o express entender JSON no BODY do request */
server.use(express.json());
/* Aplica minhas configuracoes de rota no server */
server.use(rotas);
/* Configura a porta */
server.listen("8000");