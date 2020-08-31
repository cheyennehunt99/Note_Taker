// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Require routes file
require('./Routes/apiRoutes')(app);
require('./Routes/htmlRoutes')(app);

// Setup listener
app.listen(PORT, function() {
    console.log(`App listening on PORT:${PORT}`);
});  