const express = require('express'); //external module for using express
const { Client } = require('pg') //external module for using postgres with node
const config = require('./config.js'); // internal module for connecting to our config file

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
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500').send(cities);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});










// const getAllCities = async () => {
//     let cities = await fetch('http://localhost:3000/get-cities');
//     let citiesParsed = await cities.json();
//     return citiesParsed;
// }

// getAllCities().then(cities => {
//     displayCities(cities);
// });

