# Como Usar
 - clone o repositório
 - dentro da pasta hiring rode o comando npm start
 - as dependencias serão instaladas e o servidor vai subir
 - para rodar os testes use npm test

## Frontend
- Dados das ações estão armazenados no localStorage

## Backend
-  Para ações da BOVESPA use somente o nome do papel
    - /stocks/VALE5/quote

- Para ações de outras bolsas use o símbolo da bolsa
    - /stocks/NASDAQ:AAPL/quote

### Endpoints
  - /stocks/:stock_name/quote
  - /stocks/:stock_name/history?from=<string>&to=<string>
  - /stocks/:stock_name/compare
  - /stocks/:stock_name/gains?purchasedAmount=<number>&purchasedAt=<string>