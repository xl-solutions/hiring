const fs = require('fs');
const path = require('path');

//Este codigo faz a importaçao automatica de todos os arquivos que estao dentro dessa pasta

module.exports = app =>{
 
    fs  
        .readdirSync(__dirname)//Le um diretorio. __dirname = diretorio do arquivo atual
        .filter(file => ((file.indexOf('.')) !== 0 && file !== "index.js")) // Filtra os arquivos que nao começam com "." e que nao é o index.js
        .forEach(file => {
            
            try{
                require(path.resolve(__dirname, file))(app)
            }catch(err){
                console.log(err)
                console.log(`Um erro ocorreu ao tentar importar o arquivo: ${file}`)
            }
        }); //importa o arquivo
}