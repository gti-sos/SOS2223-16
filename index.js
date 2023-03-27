const express = require("express");
const app = express();

app.use("/", express.static("./public"));

/** BODY PARSER */
const bodyParser = require("body-parser");
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