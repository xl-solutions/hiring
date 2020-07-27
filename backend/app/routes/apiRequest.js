module.exports = function (app) {
    const controller = app.controllers.apiRequest;
    app.route("/stocks/:stock_name/quote")
        .get(controller.precoAtual);
    app.route("/stocks/:stock_name/history")
        .get(controller.precoHistorico);
    app.route("/stocks/:stock_name/compare")
        .post(controller.compararAcoes);
    app.route("/stocks/:stock_name/gains")
        .get(controller.projetarGanhos);
}
