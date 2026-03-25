const express = require("express");
const app = express();

const setup = require("@config/core/setup");
app.use(setup);

module.exports = app;