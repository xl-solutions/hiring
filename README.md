
<h1 align="center">
  Finances
</h1>

### Dashboard
<img src=".github/finances_1.png" />

### Histórico
<img src=".github/finances_2.png" />

### Projeção 
<img src=".github/finances_3.png" />

## 🗒️ Sobre

Projeto criado como desafio da XL Solutions.

---

## 🚀️ O que o projeto faz?

O Finances possibilita o usuário:
- Consultar os preço atuais das ações adicionando ao seu portifólio.
- Listar o histórico da ação selecionada, informando o periódo.
- Simular os ganhos a partir de uma quantidade comprada e a data selecionada.

---

## 👨‍💻️ Tecnologias

- [Node.js](https://nodejs.org/en/)

- [Typescript](https://www.typescriptlang.org/)

- [Alpha Vantage API](https://www.alphavantage.co/documentation/)

- [ReactJS](https://reactjs.org/)

- [Styled Components](https://styled-components.com/)

---

## ⬇️ Baixe o projeto:

```bash
# Clonando o repositório
$ git clone https://github.com/marcosvcorsi/hiring.git

# Acessando o repository
$ cd hiring
```
## ⬇️ Backend:
```bash
# Acessando o backend
$ cd backend

# Instalando as dependencias
# Com Yarn
$ yarn

# Com NPM
$ npm install
```
Crie um arquivo .env, com base no arquivo .env.example contendo as seguintes variavéis
```
ALPHA_VANTAGE_URL=https://www.alphavantage.co
ALPHA_VANTAGE_APIKEY=SUA_KEY_AQUI

PORT=3333
```
Inicie o servidor com esse comandos
```bash
# Rodando o projeto na porta 3333
# Com Yarn
$ yarn dev

# Com NPM
$ npm run start

# Executando os testes
# Com Yarn
yarn test

# Com NPM
npm run test
```

## ⬇️ Frontend:
```bash
# Acessando o frontend
$ cd frontend

# Instalando as dependencias
# Com Yarn
$ yarn

# Com NPM
$ npm install
```
Crie um arquivo .env, com base no arquivo .env.example contendo as seguintes variavéis
```
REACT_APP_API_URL=http://localhost:3333
SKIP_PREFLIGHT_CHECK=true
```
Inicie o servidor com esse comandos:
```bash
# Rodando o projeto na porta 3000
# Com Yarn
$ yarn start

# Com NPM
$ npm run start
```
