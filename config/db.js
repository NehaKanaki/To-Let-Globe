const mongoose = require("mongoose");
require('dotenv').config();

  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to the database.");
    })
    .catch((err) => {
      console.error(`Error connecting to the database.${err}`);
    });
  module.exports = mongoose.connection;