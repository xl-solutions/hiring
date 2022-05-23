const index = (req, res) => {
    res.write("Corretora de ações");
    res.end();
}; 

const mainController = {
    index
};

module.exports = mainController; 