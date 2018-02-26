
# Como rodar a Aplicação
1. Instale o XCode atraves da App Store.
2. Abra o arquivo XL_APP.xcworkspace.
    1. Caso o App Não funcione, Instale o [Cocoa pod](https://cocoapods.org/).
    2. Vai ao terminal, e vá para o diretorio do projeto.
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



