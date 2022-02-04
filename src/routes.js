const express = require('express');
const knex = require('./connection');

const routes = express();

routes.get('/', async (req,res) => {
    const testeProducao = await knex('usuarios')
    res.json({ mensagem: '(master) deu tudo certo!', testeProducao});
})

module.exports = routes;