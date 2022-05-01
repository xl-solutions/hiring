const app = require("./src/app");
require("dotenv").config();

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor na porta 3000");
});