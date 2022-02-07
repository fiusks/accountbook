const express = require('express');

const { verifyEmail, registerUser, login } = require('./Controllers/Controller.js')
const routes = express();

routes.get('/', verifyEmail); // rota de verificação se o email informado ja existe no banco de dados 
routes.post('/signUp', registerUser) // rota de cadastro de novo usuário.
routes.post('/login', login) // rota de geração de token para autorização 

module.exports = routes;