const express = require("express");
const path = require("path");
const appName = "stocks";
const app = express();
app.use(express.static(`${__dirname}/dist/${appName}`));
app.get("/*", (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${appName}/index.html`));
});
app.listen(process.env.PORT || 8080, () => {
    console.log("Server listening PORT", process.env.PORT || 8080);
});