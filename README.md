# Como configurar e rodar o ambiente

- Para baixar as dependências: `bundle install`
- Crie um arquivo `config/database.yml`, baseando-se no arquivo `config/database.example.yml`. O projeto usa PostgreSQL, então você deve te-lo instalado no seu ambiente de desenvolvimento.
- Para criar a base de dados, rode o comando `rake db:create`
- Para realizar a migração, rode o comando `rake db:migrate`
- Para realizar testes, rode o comando `rspec`
