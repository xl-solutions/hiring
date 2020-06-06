# O Problema

## Background

Um novo cliente contratou a XL Solutions para desenvolver uma loja virtual especializada na venda de aparelhos de telefonia celular. Para criar o inventário inicial da loja, com todos os telefones disponíveis, o estoque e seus preços, enviou arquivos CSV com os dados a incluir. Informou também que periodicamente precisará atualizar o inventário com planilhas idênticas.

Para facilitar esse processo, é necessário criar uma interface para upload desses arquivos, e uma segunda interface que permita que a pessoa avalie o inventário da loja, mostrando aparelhos, valores e quantidades, assim como dando a possibilidade de aplicar alguns filtros.

## Requisitos

1. O usuário fará upload de um arquivo .csv no formato fornecido em `input_valid` através de um formulário;
2. Os dados contidos no arquivo serão normalizados e salvos em um banco de dados relacional;
3. O usuário será redirecionado para a página com o inventário, que indicará o sucesso ou falha da importação (preferencialmente com o motivo, no caso de falha);
4. O usuário poderá visualizar os dados importados e buscá-los por fabricante, modelo e modalidade de venda (pré- ou pós-pago).

## Observações

- A aplicação deve ser feita usando Python e Flask;
- Não é necessário se preocupar com autenticação;
- Aspectos estéticos não são primordiais;
- A aplicação deverá ter testes automatizados.

## Procedimento para entrega do teste

1. Faça o fork desse projeto no github;
2. Codifique a aplicação nesse fork;
3. Escreva um README explicando como rodar sua aplicação e os testes. Dê o máximo de detalhes;
4. Abra um pull request quando estiver pronto.
