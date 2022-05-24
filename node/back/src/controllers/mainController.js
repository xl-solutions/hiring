const index = (req, res) => {
    res.write("Corretora de ações");
    res.end();
}; 

const notFound = (req, res) => {
    res.status(404).send(`<h1>404 Página no encontrada</h1>
    <a href="/"> Ir a Inicio </a>`);
}; 

const mainController = {
    index, 
    notFound
};

module.exports = mainController; 