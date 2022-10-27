// Load environment variables from the .env file 
require("dotenv").config()

// Setup express
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
 const helmet = require("helmet");
const bodyParser = require("body-parser");

const mongDb = require('./config/mongDb')

// const { createPool } = require("mysql");

const products = require('./models/products');

const app = express()
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json());
// add cors headers
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions))

mongDb.on('error', console.error.bind(console, 'MongoDB connection error:'))


// use routes
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

 app.get("/products", (req, res)=>{
      res.send(products); 
     });

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.header("Access-Control-Allow-Origin", "*")
    res.status(500).send('Something broke 💩')
  })

const port = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running on port ${port}`))
