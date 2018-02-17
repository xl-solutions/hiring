# Loja Vitual de Cliente (XL Solutions)

Um novo cliente contratou a XL Solutions para desenvolver uma loja virtual especializada na venda de aparelhos de telefonia celular. Para criar o inventário inicial da loja, com todos os telefones disponíveis, o estoque e seus preços, enviou arquivos CSV com os dados a incluir. Informou também que periodicamente precisará atualizar o inventário com planilhas idênticas.

Para facilitar esse processo, é necessário criar uma interface para upload desses arquivos, e uma segunda interface que permita que a pessoa avalie o inventário da loja, mostrando aparelhos, valores e quantidades, assim como dando a possibilidade de aplicar alguns filtros.

# Instruções para execução

 - Suba os conteiners Nginx e MySQL: `docker-compose up -d nginx mysql`
 - Acesse esta url `http://localhost` via browser de sua preferência
 - Para rodar os testes, acesse o conteiner 'workspace': `docker-compose exec workspace bash`
    * Então execute `phpunit`


# Depedências

 - [PHP 7.0](https://websiteforstudents.com/installing-php-7-0-7-1-ubuntu-17-04/)
 - [Composer](https://getcomposer.org/download/)
 - [Laravel](https://laravel.com/docs)
    * Para criar um projeto Laravel via composer: `composer create-project --prefer-dist laravel/laravel`
 - [Laradock (VM)](http://laradock.io/)
    * [Docker](https://docs.docker.com/)
    * [Docker Compose](https://docs.docker.com/compose/)

 # LICENÇA

 MIT
