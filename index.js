import express from "express";
import cors from "cors";
import { loadBackend_agroclimatic } from "./APIs/cadiz-agroclimatic-informations-stats.js";
import { loadBackend_professionalorganisations } from "./APIs/professionalorganisations-stats.js";
import { loadBackend_civilwarandalusian } from "./APIs/civilwarandalusian-stats.js";
import { handler } from "./frontend/build/handler.js";
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Constants
 */

const PORT = 8080;

/**
 * Load APIs
 * */

loadBackend_agroclimatic(app);
loadBackend_professionalorganisations(app);
loadBackend_civilwarandalusian(app);
app.use(handler);

/**
 * Initialization
 */

app.listen(PORT);