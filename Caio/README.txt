Para a execução da aplicação os seguintes passos devem ser seguidos:

1. Instale na máquina o XAMPP, com o MYSQL e PHPMyAdmin.

2. Inicie o Apache e o MySql no XAMPP.

3. Importe o banco de dados "cliente_xl" no MYSQL utitizando o PHPMyAdmin.

4. Mantenha a tabela "inventario" do banco de dados "cliente_xl" aberta. 

4. Coloque a pasta Caio na area de trabalho (ou outro lugar).

5. Abra um Editor de Código (ou entre no diretório Caio via CMD) e execute o arquivo "app.py".

6. Quando aparecer: Running on http://127.0.0.1:5000/ ... Abra o navegador e entre nessa URL.

7. Quando abrir a página "Upload" escolha um arquivo CSV ou XLSX(excel), esses arquivos devem estar na pasta XL.

obs1: É necessário uma planilha ou CSV com apenas 5 colunas. Siga o exemplo dos arquivos "teste" e "teste2".

obs2: Caso clique em enviar sem escolher um arquivo uma mensagem de erro é disparada na página. Caso um arquivo,
que não seja CSV ou XLSX,seja escolhido outra mensagem de erro é disparada.
 
obs3: Contextualizando com a proposta de vocês, como os clientes utilizam com mais frequência o Excel, eles podem
estar passando seus arquivos XLSX para a XL e assim com esse sistema é possível fazer o upload deles. 

obs4: Os arquivos CSVs para essa aplicação foram gerados a partir do Excel, ou seja foi criado uma planilha no EXCEL e depois essa, 
foi salva no formato CSV (dessa forma, o delimitador do CSV é o ';'  Logo essa aplicação funciona com
arquivos CSV (Semicolon Separated Values).

8. Uma vez enviado o arquivo a página "Data" é aberta e os dados do arquivo são mostrados na tela, bem como salvos na tabela 
"inventario" (uma mensagem de sucesso é mostrada nessa tela).

obs1: Caso queira atualizar a planilha e fazer o upload novamente, você tem as opções: 

1 - Se quiser adicionar uma linha na planilha, basta abrir o arquivo no EXCEL, adicione-a e salva. Na página "Data" 
clique em voltar escolha novamente esse aquivo e clique em enviar que o banco de dados é atualizado.

2 - Se quiser alterar informações nas linhas existentes, atualize a planilha, salve, volte (botão voltar) e escolha novamente
esse arquivo. Assim o banco de dados éatualizado.

3 - Caso queira apagar alguma linha do arquivo, apague e salve. Clique no botão "deletar", volte no botão "voltar",
e escolha o novamente o arquivo.

9. O usuário dessa aplicação pode realizar filtros por modelo, fabricante e modalidade, basta clicar nos botões "BuscaModelo,
BuscaFabricante, BuscaModalidade" que aparecem no topo da página. Assim será aberta outra página no qual o usuário pode escrever
iniciais que será listado os produtos.
