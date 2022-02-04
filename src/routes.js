const express = require('express');
const connection = require('./connection');

const routes = express();

routes.get('/', async (req,res) => {
    const testeProducao = await connection.query('select * from usuarios');
    res.json({ mensagem: '(master) deu tudo certo!', testeProducao});
})

module.exports = routes;