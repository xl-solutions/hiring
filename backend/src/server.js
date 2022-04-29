const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor na porta 3000");
})