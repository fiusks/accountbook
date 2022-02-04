const express = require('express');
const knex = require('./connection');

const routes = express();

routes.get('/', async (req,res) => {
    const teste = await knex('usuarios');
    res.json({ mensagem: '(hml) deu tudo certo!', teste});
})

module.exports = routes;