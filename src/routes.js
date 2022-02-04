const express = require('express');

const routes = express();

routes.get('/', (req,res) => {
    res.send('(hml) deu tudo certo!');
})

module.exports = routes;