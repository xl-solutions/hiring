# Documentação de Padrão de Avaliação Técnica #

## BACK-END

### GERAL
* Este projeto tem como objetivo, validar conhecimentos técnicos referente a linguagem de progração C#.

### ESTRUTURA DO PROJETO 
* Este projeto foi desenvolvido com o Visual Studio Community 2017.
* Utilizando o padrão MVC e Framework 4.6.1. 

### EVENTOS PADRÕES - VERBO HTTP
> Eventos de uma tela CRUD

| EVENTO | VERBO |
|--------|-------|
|  LISTAR |  GET | 
|  VISUALIZAR |  GET | 
|  ADICIONAR |  POST | 
|  EDITAR |  PUT/PATCH | 
|  REMOVER |  DELETE | 

### **PADRÃO DE PASTAS** 

| PASTA | DESCRIÇÃO | SUFIXO |
| ------ |  --------- | ---------| 
| **Controllers** | Objeto que processa requisições, trata entradas e interações do usuário e executa lógicas de aplicação | Controller| 
| **Models** | Entidade do banco de dados | Model | 
| **Repositorio** | Objeto responsavel pela interação entre as telas e a Base de Dados GET / POST. | Repositorio| 
| **View** | Exibição das informações geradas a partir do arquivo carregado  | - | 

## FRONT-END

### **UTILIZAÇÃO DO SISTEMA**

* O usuário selecionará um arquivo no formato *.csv.
* Após a selecção do arquivo, o usuário irá clicar no botão: Importar Arquivo.
* Será feita uma analise no conteudo do arquivo, podendo retornar as seguintes situações:

### RETORNOS IMPORTAÇÃO DE ARQUIVOS

* **SUCESSO**
 
 * O arquivo será processado, normalizado e inserido na base de dados.
 * O usuário será redirecionado para uma nova pagina, onde as informções será exibida para o usuário.
 * Nessa nova página, o usuário poderá efetuar consultas, validando assim as informações que foram inseridas.
 

| Fabricante | Modelo | Cor | Plano de Venda | Qtde | Preço | 
|--------| ---------------| ------|------|------|------|
| SAMSUNG | S6 | PRETO | PRE-PAGO | 5 | 2000 |
 

>
* **ERRO**

> Tabela de Erros

| Fabricante | Modelo | Cor | Plano de Venda | Qtde | Preço | Situação |
|--------| ---------------| ------|------|------|------|------|
| SAMSUNG | S6 | PRETO | PRE-PAGO | 5 | 2000 | Válido |
| SAMSUNG |  |  | |  | | Inválido - Informando o motivo e a Linha que gerou o erro |

### OPÇÕES DE CONSULTAS

| Consultar Por | 
|----------------|
|  FABRICANTE |
|  MODELO |
|  PLANO DE VENDA |
