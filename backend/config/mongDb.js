const mongoose = require('mongoose')
// Load environment variables from the .env file 
require("dotenv").config()
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('MongDB Connection successful...'))
  .catch((err) => console.log('MongDB connection failed', err.message));

  const mongDb = mongoose.connection

  module.exports = mongDb