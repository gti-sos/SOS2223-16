import express from "express";
import cors from "cors";
import { loadBackend_agroclimatic } from "./APIs/cadiz-agroclimatic-informations-stats.js";
import { handler } from "./frontend/build/handler.js";
const app = express();
app.use(cors());
//app.use("/", express.static("./public"));

/** BODY PARSER */
//const bodyParser = require("body-parser");
app.use(express.json());

/**
 * Constants
 */

const PORT = 8080;

/**
 * API ROUTES
require('./APIs/professionalorganisations-stats')(app);
require('./APIs/civilwarandalusian-stats')(app);
require('./APIs/cadiz-agroclimatic-informations-stats')(app);
*/
loadBackend_agroclimatic(app);

app.use(handler);

/**
 * Initialization
 */

app.listen(PORT);