# Como rodar o Codigo
1. Instale o XCode atraves da App Store.
2. Abra o arquivo XL_APP.xcworkspace.
    1. Caso o codigo não rode, instale o [Cocoa pod](https://cocoapods.org/).
    2. Vai ao terminal, e digite o caminho para o diretorio do projeto. cd ~/XL_APP
    3. Digite pod install.
    4. No arquivo Connection.swift na linha 580, troque:
    ```swift
    sqlite3_result_text(context, result, Int32(result.characters.count), SQLITE_TRANSIENT)
    ```
    por:
    ```swift
    sqlite3_result_text(context, result, Int32(result.count), SQLITE_TRANSIENT)
    ```
    5. No arquivo Schema.swift na linha 151, troque:
    ```swift
    let index = string.characters.reduce("") { underscored, character in
    ```
    por:
    ```swift
    let index = string.reduce("") { underscored, character in
    ```
    6. No arquivo Query.swift na linha 941, troque:
    ```swift
    var names = each.expression.template.characters.split { $0 == "." }.map(String.init)
    ```
    por:
    ```swift
    var names = each.expression.template.split { $0 == "." }.map(String.init)
    ```
    7. No arquivo Expression.swift na linha 80, troque:
    ```swift
    return expressed.template.characters.reduce("") { template, character in
    ```
    por:
    ```swift
    return expressed.template.reduce("") { template, character in
    ```
    8. No arquivo Helpers.swift na linha 59, troque:
    ```swift
    let escaped = characters.reduce("") { string, character in
    ```
    por:
    ```swift
    let escaped = reduce("") { string, character in
    ```
# Como rodar os testes
1. Os testes se encontram no arquivo: XL_APPTests.swift
2. Para rodar todos os testes clique no losango ao lado do class XL_APPTests: ![Losango](https://cdn.discordapp.com/attachments/417644285173825538/417645046440132609/XL_APPTest.png)
3. Para rodar um codigo em especifico clice no losangolo ao lado da função desejada: ![Função](https://cdn.discordapp.com/attachments/417644285173825538/417646480208429056/FunctionXL_APP.png)