Hey and welcome!

In order for the code to work there are some steps that needs to be taken.

## 1. First off, we need to install Node.js.

Please head over to https://nodejs.org/en/ and follow the steps to install it.
We will need it to create our project.

## 2. Dependancies

** Body-Parser **
First we install bodyParser, you can do so by typing 'npm i body-parser'
in the terminal. The Body-parser module parses JSON buffer, string and URL encoded
data submitted.

** express **
In order to install express, type 'npm i express' in the terminal.
We need the express framework since it provides a robust set of features for our web application.

** sqlite3 **
In order to install sqlite3, type 'npm i sqlite3' in the terminal.
SQLite is a C library that provides a lightweight disk-based database.
With this it allows accessing the database using a nonstandard varient of
the SQL query language.

To save time you can also install all of these at once typing 'npm i body-parser express sqlite3'.

Our API calls will be made possible with Postman, a program that lets you handle and send data through the header.
In order to install postman go to https://www.postman.com/downloads/ and follow the installation instructions

### Start server

Type in terminal:
`npm start`

## API Documentation

| Name | Request type | Endpoint Body | </br>
| -------------------- | ------------ | ---------------| <br />
| Get an ITEM | GET | [http://localhost:8000/api/transactions] | <br />
| Gets you all items and transactions in the database and it displays them. <br />  
| Posts items into database | POST | [http://localhost:8000/api/populate] | <br /> { "item_name": "string", "category": "string, "price": "integer", "postnr": "integer", "store_name": "text", "location": "text", "card_number": "integer}<br />
Populates the database with dummy data we can use for our project <br />
| CARD | <br />
| Delete card number| DELETE | [http://localhost:8000/api/transactions/{1258}] <br />
| Deletes all transactions from a card with specified card number <br />
| Get only card numbers | GET | [localhost:8000/api/card/] <br />
| Gets you only card numbers from the database <br />
| Get today | GET | [localhost:8000/api/day/{2022-11-15}] <br />
| Here you can specify a date you want to retrieve all transactions from <br />
| GET data between dates | GET | [localhost:8000/api/month/month/year] <br />
| In the code you can specify inbetween which two dates you would like to retrieve data <br />
| You can also specify if you want mm(months), yy(years), ww(weeks), dd(days) ect <br />
