const express = require("express");
const app = express();

// * Utilização do modulo de rotas
const routes = require("@app/routes");
app.use(routes);

// * Utilização das configurações da aplicação
const setup = require("@config/core/setup");
app.use(setup);

module.exports = app;