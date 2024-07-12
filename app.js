const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Connect to MongoDB
require('./config/db');

// Routes
const indexRoutes = require('./routes');

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.engine("html",ejs.renderFile);
app.set("view engine","html");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,'public')));
app.use(indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
