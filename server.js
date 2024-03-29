
// Dependencies
var express = require("express");
var bodyParser = require("body-parser")
var mysql = require("mysql")

// Sets up the Express App

var app = express();
var PORT = process.env.PORT || 3030;


// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory
app.use(express.static("public"));

require("./routes/html-routes")(app);
require("./routes/user-routes")(app);
require("./routes/plant-routes")(app);


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {

    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });


