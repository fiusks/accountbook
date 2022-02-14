require("dotenv").config();
const express = require("express");
const routes = require("./router/routes");
const cors = require("cors");

const app = express();

app.options("*", cors());

app.use(express.json());

app.use(routes);

module.exports = app;
