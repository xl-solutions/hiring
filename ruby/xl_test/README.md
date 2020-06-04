## Using

ruby '2.6.4'
rails '6.0.2'

## Como rodar a aplicação XL Test

Depois de clonar, navegar até a paste onde se encontra o app.

```sh
cd xl_test
```

```sh
bundle install
```

```sh
rake db:create db:migrate
```

Nesse ponto, não haverá nada no banco de dados, então é preciso iniciar o servidor e fazer upload dos arquivos csv.

```sh
rails s
```

## Testes

Para rodar os testes da aplicação, basta rodar o comando

```sh
bundle exec rspec spec
```

