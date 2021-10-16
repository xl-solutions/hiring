# Background

A new client hired XL Solutions to develop a virtual store specialized in mobile devices. To first create the store inventory, with all available devices, quantity and prices, they sent a CSV file with the data. He also informed that he needs to update this information periodically with save type CSV.

To make this process easier, it is needed to create a interface where this files can be uploaded, and a second interface that allows the user to validate the uploaded information which shows device, price, quantity. This interface should also allow filtering the data.

# Requirements:
1. The user will upload a .csv format file which is provided in `input_valid` in a form;
2. The data provided in this file should be normalized and saved in a relational database;
3. The user will be redirected to a page with the new inventory with a message indicating success or fail in the importation (ideally with the reason in cases of fail);
4. The user will se the imported data e will be able to search for it based on manufacturer, model, and carrier plan type ("pré" or "pós").

# Other information:

- The application should be made using C#;
- There is no need to worry about authentication;
- Look and feel are not a primary concern;
- The application should have automated tests.

# Test delivery procedures:

1. Fork this project on github;
2. Build your code on the fork;
3. Write a README explaining how to run your application and the tests. Give as much details as possible;
4. Open a pull request when you are done;

