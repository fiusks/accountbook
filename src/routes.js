const express = require('express');
const connection = require('./connection.js');
const { test } = require('./Controllers/Controllers')
const routes = express();

routes.get('/', test)

module.exports = routes;