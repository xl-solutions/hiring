# IPNET  -  Teste Desenvolvedor Junior Full Stack 

*Antes de mais nada vou deixar aqui abaixo os links dos meus projetos que comentei  com a Raquel durante a entrevista, para que* ***se for possivel sejam considerados na avaliação também por favor.***

Projeto clone netflix com enfoque no **Front End**,  
usando **Next.Js, React, MateriaUI e styled-components.**  
[https://www.linkedin.com/feed/update/urn:li:activity:6925777592532750336/](https://www.linkedin.com/feed/update/urn:li:activity:6925777592532750336/) </br>  
Projeto de uma aplicação web de delivery de comida, estilo iFood, UberEats etc...

usando  **Next.Js, React, TypeScript e TailwindCSS.**  
[https://www.linkedin.com/feed/update/urn:li:activity:6922147688675168257/](https://www.linkedin.com/feed/update/urn:li:activity:6922147688675168257/)  
  
**API** usando **Node e MySql** que fiz como teste técnico de outra seleção:  
[https://github.com/guilhermemm-dev/accurate-software.github.io](https://github.com/guilhermemm-dev/accurate-software.github.io)  


**API** simples usando **Node e MongoDB** - CRUD básico  
[https://github.com/guilhermemm-dev/api-node-mongodb](https://github.com/guilhermemm-dev/api-node-mongodb)


<hr/>
<hr/>

# Teste Desenvolvedor Junior Full Stack 

***Notas preliminares:** infelizmente devido ao pouco tempo livre que tive nos ultimos dias não consegui terminar por completo o teste, mas de qualquer forma vou apresentar para vocês o que eu projetei fazer e o que eu já fiz.*

### Minha ideia inicial foi: criar uma aplicação web para uma empresa do ramo de investimentos que preste consultoria financeira aos seus clientes.

E que além de outras coisas seja capaz de verificar o desempenho de uma ação(stock) em quatro cenários, assim como foi sugerido no teste:
- Preço atual

- Preço histórico

- Preço atual em comparação com outras ações

- Projeção de ganhos com compra em dados específicos.


# Sobre a aplicação Frontend:

Trata-se de uma SPA construida usando **React.js** com um formulário de login que dara acesso a aplicação principal.

![login-page](https://images2.imgbox.com/57/5a/hCilWLUe_o.png)

![index-page](https://images2.imgbox.com/25/5b/ulyw0hH0_o.png)



Fiz um esboço inicial no Figma que pode ser consultado nesse link:
https://www.figma.com/file/8A4nlHKQNKC4vgrPKjDoxA/IPNET---Aplica%C3%A7%C3%A3o-para-uma-Consultoria-Financeira?node-id=434%3A5

<hr/>
<hr/>

# Sobre a aplicação Backend:

## API  Rest, feita em Node.js  e  Express  framework

  

###  Objetivo:  Prover uma API que possa ser devidamente consumida pelo frontend da aplicação e que inicialmente verifique o desempenho de uma ação(stock) em quatro cenários:

- Preço atual

- Preço histórico

- Preço atual em comparação com outras ações

- Projeção de ganhos com compra em dados específicos.

  

<hr>

  

##   Recursos usados ​​no desenvolvimento::

  

- Node.Js;

- Express.Js

- Nodemon tool

- Postman (api request/response tests)

  

## Arquitetura


- `server.js`: Server listener file

- `app.js`: Database connection

- `routes.js`: HTTP Routes

- `src/services`: Requisitions

- `src/controller`: Application Controllers

  

## Como rodar a aplicação?

  

1. `git clone https://github.com/guilhermemm-dev/stocks-backend

2. `cd /stocks-backend

3. `npm i`

4. Altere ".env.example" para".env"

5. Insira in .env as variaveis locais requiridas

6. Pronto, você já pode seguir os proximos passos.

  

## Instalação de dependecias do projeto:

  

1. npm install express

2.  npm install --save-dev nodemon


  

## Testando a aplicação usando o Postman:

  

Caso queira testar a API criada no projeto, primeiro baixe o [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop).

Após baixar o Postman, basta seguir os passos abaixo para poder testar as rotas da API.

  

## Padrão de Rotas:

  
Buscando seguir o padrão e design da API, seguem abaixo as URI's das rotas a serem desenvolvidas, todas as rotas criadas e exemplos podem ser visualizados no link abaixo:

https://documenter.getpostman.com/xxxxx

  

<hr/>

  

<h3> Feito por Guilherme Martins - @guilhermemm-dev </h3>

  

- LinkedIn: https://www.linkedin.com/in/guilhermemm-dev/

- GitHub: https://github.com/guilhermemm-dev

- Portfolio: https://guilhermemm-dev.github.io/portifolio/
