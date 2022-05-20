# Comandos - Informações

NO FrontEnd foi usado o Create React App

## Diretório: cd BackEnd: 

### yarn install - adiciona todas as dependêcias

### yarn dev - executa server.ts em desenvolvimento 

### yarn test - executa teste unitarios

### yarn build - compila BackEnd com babel

### yarn buildDev - executa webpack com o arquivo serve.js gerado pelo babel
Webpack gerava error no server.ts ao tentar compilar 

### yarn start - executa bundle gerado pelo webpack na porta 3333 

## Diretório: cd frontend

### yarn install - adiciona todas as dependêcias

### yarn start - executa aplicação react


## Diretório: hiring-test-node

## Rodar aplicação 

### yarn startApp - não executa os dois serviços

### yarn startBack - executa somente BackEnd

### yarn startFront - executa somente FrontEnd


# Detalhes

FrontEnd = Não é possível executar comparação de ações pois mesmo após liberar cors
de get e post, requisições post permaneceram bloqueadas

Aplicação BackEnd foi testada com requisições no Insomnia, ocorre tratativa de erros
com instância AppError, porém não consegui mostrá-los no FrontEnd

BackEnd = Como não havia um banco de dados, api para buscar dados de ações foi usada 
com o mesmo princípio para se acessar métodos de um banco nos repository

Como não haviam entidades não foi posspivel definir retornos corretos para os métodos


