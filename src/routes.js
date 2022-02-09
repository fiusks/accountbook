const express = require('express');
// const clients = require('./Controllers/clients.js');
const checkToken = require('./Controllers/Filtro/checkToken')
const {checkLogin} = require('./Controllers/Control.js')
const users = require('./Controllers/users')
const routes = express();

routes.get('/', users.verifyEmail); // rota de verificação se o email informado ja existe no banco de dados 
routes.post('/signUp', users.registerUser) // rota de cadastro de novo usuário.
routes.post('/login', users.login) // rota de geração de token para autorização 
routes.put('/editUser',checkToken, users.editUser) // rota de edição de usuarios logados.

routes.get('/checkLogin', checkLogin); // rota de verificação de token valido.

// routes.post('/registerClient',checkToken, clients.registerClient) //rota de cadastro de novo cliente.


module.exports = routes;