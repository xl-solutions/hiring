# How to run the code
1. Install the XCode through the App Store.
2. Open the file XL_APP.xcworkspace.
    1. If the code not run, Install the [Cocoa pod](https://cocoapods.org/).
    2. Go to the terminal, and go to directory path of the project.
    3. Type pod install.
    4. On the file Connection.swift in the line 580, change:
    ```swift
    sqlite3_result_text(context, result, Int32(result.characters.count), SQLITE_TRANSIENT)
    ```
    por:
    ```swift
    sqlite3_result_text(context, result, Int32(result.count), SQLITE_TRANSIENT)
    ```
    5. On the file Schema.swift in the line 151, change:
    ```swift
    let index = string.characters.reduce("") { underscored, character in
    ```
    por:
    ```swift
    let index = string.reduce("") { underscored, character in
    ```
    6. On the file  Query.swift in the line 941, change:
    ```swift
    var names = each.expression.template.characters.split { $0 == "." }.map(String.init)
    ```
    por:
    ```swift
    var names = each.expression.template.split { $0 == "." }.map(String.init)
    ```
    7. On the file  Expression.swift in the line 80, change:
    ```swift
    return expressed.template.characters.reduce("") { template, character in
    ```
    por:
    ```swift
    return expressed.template.reduce("") { template, character in
    ```
    8. On the file  Helpers.swift in the line 59, change:
    ```swift
    let escaped = characters.reduce("") { string, character in
    ```
    por:
    ```swift
    let escaped = reduce("") { string, character in
    ```
# How to run the tests
1. The test are on the file : XL_APPTests.swift
2. To run all test click on the diamond at the side of the class XL_APPTests: ![Losango](https://cdn.discordapp.com/attachments/417644285173825538/417645046440132609/XL_APPTest.png)
3. To run a specific code click on the diamond at the side of the function desired: ![Função](https://cdn.discordapp.com/attachments/417644285173825538/417646480208429056/FunctionXL_APP.png)