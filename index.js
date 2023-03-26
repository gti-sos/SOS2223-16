var express = require("express");
var app = express();

app.use("/", express.static("./public"));

/** BODY PARSER */
var bodyParser = require("body-parser");
app.use(bodyParser.json());

/**
 * Constants
 */

const PORT = 8080;

/**
 * API ROUTES
 */

require('./APIs/professionalorganisations-stats')(app);
require('./APIs/civilwarandalusian-stats')(app);
require('./APIs/cadiz-agroclimatic-informations-stats')(app);

/**
 * Initialization
 */

app.listen(PORT);