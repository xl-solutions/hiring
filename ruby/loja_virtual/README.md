# README

O sistema foi desenvolvido utilizando os seguintes artefatos:

* Ruby version - 2.5.0p0 (2017-12-25 revision 61468) [x86_64-linux]

* Rails version - Rails 5.1.5

* SQLite3

Ao efetuar checkout do projeto, executar os seguintes comandos na pasta raiz:

* bundle install

* rake db:create db:migrate

Para executar os testes unitarios e funcionais, basta executar o seguinte comando:

* rails test

Para iniciar a aplicacao, executar o comando:

* rails server

Aplicacao deve estar disponivel em:

* http://localhost:3000/

#COMO USAR

Ao iniciar a aplicacao pela primeira vez, nao havera nenhum registro no banco de dados.

Clique no link "Import" no menu superior, o sistema ira apresentar um formulario para envio de arquivos CSV padronizados. Selecione o arquivo desejado e envie. Ao termino da importacao, sera redirecionado a tela inicial, caso algum ERRO seja detectado nos registros, os erros serao listados. Os registros que estiverem em conformidade, serao importados e salvos no banco de dados.

Apos realizar a importacao, clique no link "List" no menu superior, sera entao apresentada a lista de registros importados.

Caso queira filtrar a lista de registros, utilize o formulario de filtro logo acima da listagem. Basta digitar um termo que esteja contido em Modelo, Fabricante, Cor ou Tipo de Plano, que o filtro sera aplicado.
Para remover o filtro, limpe o campo de pesquisa e acione o botao do formulario.