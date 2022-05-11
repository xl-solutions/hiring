# Backend da aplicação

API_KEY = 
API_BASE = 

## verificar o desempenho de uma AÇÃO(STOCK) em cinco cenários:

- Preço atual;

- Preço histórico; 

- Preço atual em comparação a outras ações; → matchScore

- Projeção de ganhos com compra em data específica.


## instruções:

Backend: um serviço de backend especializado nesses requisitos
(que permitirá que essas funcionalidades 
sejam reutilizadas em outros produtos da empresa)

Para obter dados de ações, você poderá usar o 
Alpha Vantage ([https://www.alphavantage.co](https://www.alphavantage.co/)).
Caso queira utilizar bibliotecas prontas para isso — sinta-se livre para utilizá-las.

O serviço deverá ser implementado via HTTP, 
e o formato de serialização das requisições e respostas será JSON.
O backend deverá ser implementado em node.js, 
seja com http puro, seja com framework de sua escolha.

## Recomendações

- ### TESTES -> 
Sua solução deverá ter testes automatizados, 
tanto no frontend quanto no backend.

- ### TRATAMENTO DE ERROS -> 
O tratamento de erros não será explicitado nos endpoints.
O candidato ou candidata poderá inferir casos que poderão gerar erros 
ou duplicidades nos dados, e tratá-los de acordo.
A ausência de tratamento não desqualifica a proposta; 
a presença, no entanto, contará pontos a favor.

- ### Detalhes sobre a função/rota PROJEÇÃO DE GANHOS:
A ideia é implementar algo simples, sem preocupações com dividendos, 
taxas administrativas ou outras incumbências que afetariam o montante total. 

Em sendo assim, pressuponha que a compradora investiu seu dinheiro 
numa determinada quantidade de ações de uma empresa em alguma data no passado, 
e que deseja saber quanto teria ganhado ou perdido caso o fizesse.



### ================================================================== ###


# Frontend da aplicação: 

## Sera um dashboard configurável que dará visibilidade aos dados.

==> Sua missão para este teste é implementar ambas as partes.(front e back)

O frontend será uma single-page application (SPA), 
e poderá ser implementado com a solução de sua escolha:

Angular, Angular 2/4, Vue.js, React, você decide.

Forneça, em conjunto, uma configuração de build com Webpack, rollup, browserify
ou outra solução de sua escolha, 

e um comando único para subir sua aplicação.