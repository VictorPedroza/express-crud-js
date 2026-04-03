const express = require("express");
const app = express();

// * Utilização das configurações da aplicação
const setup = require("@config/core/setup");
app.use(setup);

// * Utilização do modulo de rotas
const routes = require("@app/routes");
app.use(routes);

// * Middleware base para error
const { errorHandler } = require("@shared/utils");
app.use(errorHandler);

module.exports = app;