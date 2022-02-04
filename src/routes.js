const express = require('express');

const routes = express();

routes.get('/teste-producao', (req,res) => {
    res.send('(master) deu tudo certo!');
})

module.exports = routes;