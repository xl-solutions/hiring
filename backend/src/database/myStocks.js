const fs = require("fs");
const { readFile } = require("fs/promises");
const path = require("path");
const file = path.resolve(__dirname, "myStocks.json");

module.exports = {
    save(data) {
        return new Promise((resolve) => {
            return fs.writeFileSync(
                file,
                JSON.stringify(data),
                resolve(require(file))
            );
        });
    },

    get() {
        return new Promise((resolve) => {
            return fs.readFile(file, "utf8", (error, data) =>
                resolve(JSON.parse(data))
            );
        });
    },

    add(stock) {
        return new Promise((resolve) => {
            readFile(file, "utf8", (error, data) => JSON.parse(data)).then(
                (fileRaw) => {
                    const newFile = JSON.parse(fileRaw);
                    newFile.push(stock);
                    return fs.writeFileSync(
                        file,
                        JSON.stringify(newFile),
                        resolve(require(file))
                    );
                }
            );
        });
    },
};