/* Classe para rotas */
const express = require("express");
const routes = express.Router();

/* Importacao dos meus Controllers */
const AcaoController = require("./controller/AcaoController");

/* Testar se a API esta respondendo */
routes.get("/",function(req,res){
    return res.json({XLSolutions:"API de Ações"});
});

/* Funcionalidades da API */
routes.get("/stocks/:stock_name/quote",AcaoController.quote);
routes.get("/stocks/:stock_name/history",AcaoController.history);
routes.post("/stocks/:stock_name/compare",AcaoController.compare);
routes.get("/stocks/:stock_name/gains",AcaoController.gains);


module.exports = routes;
