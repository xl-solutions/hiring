# Stocks-Project
Um projeto para gerenciar ações que permite: 

   - Cotar uma ação;
   - Determinar seu Preço histórico;
   - Preço atual em comparação a outras ações;
   - Projeção de ganhos com compra em data específica.

# Documentação da API 


# Utilização: 

- Gere sua chave gratuitamente em : 
- https://www.alphavantage.co/ 
- Preencha o arquivo api/.env com a informação da chave: 
- ALPHA_API_KEY= "Sua Chave"

### Instalação dos Pacotes do Front-End: 

Na raiz do projeto:

```
 npm install
 npm run start
```
## Inicialização do Front-End

Dentro da raiz do projeto , navegue cd front-end e rode o comando npm start


## Inicialização do Back-End : 

Raiz do projeto de api:

```
- cd /back-end
- npm install
- npm run dev 
```


## Testes Automatizados


```
- cd /back-end
- npm run test
```

## Construção: 

- npm run build

## Rotas back-end
- Busca unitaria : http://127.0.0.1:3333/stocks/IBM/quote
- Busco de historico : http://127.0.0.1:3333/stocks/PETR4.SA/history?from=<string>&to=<string>
- - comparar com outras ações : http://127.0.0.1:3333/stocks/<stockname>/<stocks>/compare
- Projeção da ação: http://127.0.0.1:3333/stocks/<stock_name>/gains?purchasedAmount=<qtd_compra>&purchasedAt=<data_compra>