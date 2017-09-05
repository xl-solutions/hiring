# XL-Solutions (Node.js test) - Denis Bernardo

# Como usar
   - Clone o repositório;
   - Execute `npm start` dentro da pasta hiring (isso pode levar alguns minutos);
   - O back-end irá rodar em: `localhost:8080`;
   - O front-end irá rodar em: `localhost:5000`.

## Testes
Há testes tanto no back-end, como no front-end, para executa-lós:
   - Execute `npm test` dentro da pasta hiring;

Para o back-end, foram utilizadas as seguintes bibliotecas de teste: *mocha.js, chai.js, chai-http.js*
Já para o front-end: *jest.js*

## Backend
Para o back-end, a API foi construída usando express.js (para o servidor) e joi.js (para as validações de entrada). As respostas retornam o código HTTP de acordo com ação. Os seguintes endpoints foram criados:

### Endpoints

`GET /stocks/:stock_name/quote` - Retorna a cotação mais recente para a ação

`GET /stocks/:stock_name/history?from=<string>&to=<string>` - Retorna preço histórico da ação num intervalo inclusivo

`POST /stocks/:stock_name/compare` - Compara uma ação com uma ou mais ações

Entrada:

- `stock_name` - parâmetro passado na URI indicando o nome da ação (PETR4.SA, VALE5.SA)
- Payload JSON com uma lista de ações:

```js
{
  "stocks": [<string>, <string>, ...]
}
```
  
`GET /stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>` - Projeta ganhos com compra em uma data específica

## Frontend
Para o front-end foi usado o react.js (create-react-app), que trás as configurações minimas e essenciais para rodar a aplicação, com o uso do webpack e babel. O dados são salvos no localStorage.

## Considerações
Os informações sobre as ações são obtidas por meio da biblioteca [google-finance](https://github.com/pilwon/node-google-finance)


