Para rodar a aplicação basta abri-lá no visual studio.

O banco está hospedado em um servidor, porém caso queira criá-lo no servidor local, você pode
executar os arquivos CreateDatabase.sql e CreateTables.sql. Ambos estão armazenados dentro da pasta Banco, que está na raiz do projeto.

Para testar a aplicação, você deverá acessar a página de uploads, no link que está na barra superior
chamado (novo arquivo). Ao selecionar o arquivo desejado, que deverá ser do tipo .txt ou .csv,
o sistema irá realizar todo o processo de importação dos dados, verificando se os itens disponíveis no arquivo possuem informações válidas e se as linhas
do arquivo possuem o layout esperado. 
Após realizar as validações e as operações necessárias o sistema irá redirecionar o usuario a uma tela de resumo, 
onde é possivel verificar o resumo do processo. 

Caso o processo tenha gerado algum erro (informações inválidas por ex), o sistema irá disponibilizar na tela de resumo
um arquivo para download, onde é possivel verificar o que exatamente aconteceu.

Para visualizar os produtos que foram inseridos ou alterados basta clicar no link produtos também no menu superior. Através da página de produtos é possível 
visualizar todos os produtos que já foram cadastrados e realizar a busca dos mesmos pelo nome.

