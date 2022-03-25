### Expense_Sharing
## Problem Statement:
Create an expense sharing application (API based) - An expense sharing application is where you can add your expenses and split it among different people. The app keeps balances between people as in who owes how much to whom.
Requirements:
# User:
 Each user should have a userId, name, email, mobile number.

 # Expense:
 Could either be EQUAL, EXACT or PERCENT
Users can add any amount, select any type of expense and split with any of the available users.
The percent and amount provided could have decimals upto two decimal places.
In case of percent, you need to verify if the total sum of percentage shares is 100 or not.
In case of exact, you need to verify if the total sum of shares is equal to the total amount or not.
The application should have a capability to show expenses for a single user as well as balances for everyone.
When asked to show balances, the application should show balances of a user with all the users where there is a non-zero balance.
The amount should be rounded off to two decimal places. Say if User1 paid 100 and the amount is split equally among 3 people. Assign 33.34 to the first person and 33.33 to the others.

## INSTRUCTION TO RUN CODE

# 1 git clone and fetch

# 2 install external dependency(npm i)

# 3 set own nosql db of string and stores data into database

# 4 testing on postman



