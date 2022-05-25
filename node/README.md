# AppInvestimentos

_AppInvestimentos é um aplicativo que permite consultar diferentes características de ações de forma simples e organizada._

Com este aplicativo podemos:

    - Ver o preço atual das ações;
    - Ver o preço histórico da ação entre datas específicas;
    - Ver o preço atual em comparação com outros anos;
    - Obter uma projeção de ganhos obtidos com a compra em uma data específica.
    - Adicionar e quitar ações no Portfolio. 

## Iniciando

_Estas instruções permitirão que você obtenha uma cópia de trabalho do projeto em sua máquina local para fins de desenvolvimento e teste._

Consulte **Implantação** para saber como implantar o projeto.


### Pré requisitos

- Ter o NodeJS v16.15.0 e o NPM v8.10.0 instalados.
- Ter o Git instalado.

### Instalação

1. Criar uma conta gratuita na API de consulta usada no [Market Stack](https://marketstack.com/signup/free) para obter o token para acessar as consultas. (Você tem um máximo de 100 consultas gratuitas por conta.) Você terá um Token nas configurações e deixo dois aqui para poder usar. O token pode ser alterado de node > back > .env. Carrego o arquivo ".env" no GitHub como exceção para que os testes apropriados possam ser realizados.

```
41ff385aa180847b455274b3d35c625f
```
```
b72ceef6b1aa1b603282297fb9778af0
```

2. Baixe o projeto do repositório. (Será enviado por um Pull Request). 

3. Entre na pasta do projeto com o console (hiring > node) e execute o seguinte script para baixar os módulos do Node:

```
acá va el comando para descargar las librerias de Node (hacemos una para los dos ? )
```

4. Execute o seguinte script para compilar e iniciar os servidores backend e frontend
```
$ start. noseqe.sh
```


## Executando os testes

1. Para realizar os testes do sistema devemos entrar no console e executar o seguinte script
```
$ npm test
```

## Implantação

Para poder desplegar, debemos...

## Construído com

* React
* Express
* NodeJS
* JavaScript
* Sistema Operativo macOS 11.6

## Versionado 

Usamos [Git](https://git-scm.com) para el versionado.

## Autor

* **Matias Contreras** - *Test* - [matcontreras](https://github.com/matcontreras)