A aplicação possiu 3 interfaces de iteração com o usuario.
Index, é a pagina principal de acesso a aplicação.
Upload do arquivo, para inserir os dados do arquivo no banco de dados.
Inventario, para avaliar o inventario da loja.

Index é a página principal, serve para redirecionar às duas interfaces funcionais.

Upload do arquivo:
Possui o botão "Escolher arquivo", onde abrirá o explorer para encontrar o arquivo .CSV,
após selecionado o arquivo, o usuário deve clicar no botão upload que realizará a operação para enviar os dados para o banco de dados,
e o botao voltar para a página inicial.
O arquivo para upload deve ser, só e somente só do tipo .CSV, caso o usuário queira enviar outro tipo de arquivo, a aplicação não permitirá 
devolvendo um erro através de alert(). Também, caso o usuário não escolha nenhum arquivo e clique em upload, a apliação não permitirá devolvendo um erro.
Após enviar o arquivo, a aplicação retornará uma mensagem satisfatória da operação, caso a operação for deficiente, retornará uma mensagem de erro indicando o motivo do erro.

Inventario
Trás o último inventario inserido, assim é possivel que o dono da loja, avalie os preços de acordo com datas retroativas.
Caso não possuoa nenhum inventario inserido, a aplicação retorna com um erro, indicando que não há dados inseridos.
Para aplicar os filtros, basta clicar na marca, modelo ou tipo de plano. A aplicação carregará a consulta automaticamente, não havendo a necessidade de clicar em nenhum outro botão.

