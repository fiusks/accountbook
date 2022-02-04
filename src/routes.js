const express = require('express');
const { test } = require('./Controllers/Controllers')
const routes = express();

routes.get('/', test)

module.exports = routes;