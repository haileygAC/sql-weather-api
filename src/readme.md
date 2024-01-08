# SQL Node Project 2 - Weather Project

### Introduction

In this tutorial, we’ll learn how to build a REST API using PostgreSQL as our database and Node.js (JavaScript) as our programming language AND connect it to a frontend application.

### Learning Objectives

Students should get **hands-on experience** with:

- Understanding REST Principles 
- HTTP Methods and CRUD Operations
- Connecting to a SQL database
- Building a fully functional backend system for user interactions
- Connecting and handling user interactions on the frontend.

### Creating the Database

1. We will be using the same database that we used for our practice project, with https://dashboard.render.com/. 


### Connecting to the Database
1. Open pgAdmin. Right click on Servers (or Server Groups)
2. Click on the Server you created, then Databases. Then click on the sql_postgres_practice database. You will then select Schemas, and then select public. 

### Adding Data

 Let’s add the saved_city table. First, right click on the Tables section in your DB in pgAdmin, and then select Query Tool. 

``` sql

CREATE TABLE saved_city
(
  id            SERIAL NOT NULL,
  city_name     VARCHAR(255) NOT NULL ,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (id)
)

```

4. Click the Play button to run the query.
5. You should be able to right click on the saved_city table and select View All Data to see all of your columns!
6. Let's add two saved cities so that we can see them when we test.

``` sql
INSERT INTO saved_city(id,city_name) 
VALUES 
(1,'Oakland'),
(2,'London');
```


### Creating the Web Server and API

1. Open your weather-project's code repository. Create a new folder called server. This will be what stores all of the code for the backend application. Note: You can put all of your frontend code in a folder called user-interface, if that is helpful!
2. `cd` into the server folder and into the Run `npm init` to initialize the package.json.
3. Run the following command, `npm install express` to add Express.
4. Run the following command, `npm install pg` to add node-postgres.


### Linking the DB and the API
1. Create the config.js file on the server folder with the following contents:

``` javascript

const config = {
  user: 'sql_postgres_practice_user',
  host: '[database.server.com] Replace with your URL',
  database: 'sql_postgres_practice',
  password: 'Replace with your password',
  port: 5432,
  ssl: true
}
module.exports = config;

```

2. Add the `config.js` file to your `.gitignore` file. We don't want a file with passwords to be added to Github!



### Building the API

Now, let's write the code that starts our application. Create a src folder and an index.js file. In the index.js file, add the following code. This code should look familiar. We are adding express and building our application. Now we need to add the code that will allow us to connect to our database. 

``` javascript
const express = require('express'); //external module for using express
const Client = require('pg') //external module for using postgres with node
const config = require('../config.js'); // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values
 
await client.connect() //connecting to our database


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

await client.end() //ending the connection to our database

```

2. This code uses a Client, which is an object that allows us to connect with our database. We have to enter the config object to securely connect to the proper database, and then we need to establish a connection.

3. Now, we need to build our route and helper function to get our data. We are going to create a GET request to get all of the saved cities.


``` javascript
const express = require('express'); //external module for using express
const { Client } = require('pg') //external module for using postgres with node
const config = require('../config.js'); // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

//NEW CODE
const getCities = async () => {
  await client.connect() //connecting to our database
  const result = await client.query('SELECT * FROM saved_city');
  console.log(result.rows);
  await client.end() //ending the connection to our database
  return result.rows;
}

app.get('/get-cities', async (req, res) => {
  const cities = await getCities();
   // This will allow us to connect our localhost frontend to make the API call. Check to see if your port is the same. Without this extra code, the browser will throw an error because it will think there is a security risk.
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500').send(cities);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### Testing

Now we get to test our application with Postman! Let's open Postman and enter a GET request to `localhost:3000/get-cities`. We should see our list of languages!

### Connecting our frontend
1. In our frontend call, we need to make an API call to get all of the saved cities. 

2. In our JavaScript file, let's talk through adding this code:

```javascript

const getAllCities =  async () => {
    let cities = await fetch('http://localhost:3000/get-cities');
    let citiesParsed = await cities.json();
    console.log(citiesParsed);
    return citiesParsed;
  }
  getAllCities() // This function is called when app first loads, you will call this function in your JavaScript file. You might call it inside of another function.

```
3. Now that you have an array of data, how will you display this to the user?

### Next Steps
For your lab, you will build on this project by adding a POST for adding a new saved city. BONUS: You can add an option in the UI to have the user select which cities they want to save.
