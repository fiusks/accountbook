const express = require('express');
const clients = require('./Controllers/clients/clients');
const checkToken = require('./Controllers/Filtro/checkToken')
const {checkLogin} = require('./Controllers/Control.js')
const users = require('./Controllers/users/users')
const routes = express();
// rotas de Cadastro/Login VVV
routes.get('/', users.verifyEmail); // rota de verificação se o email informado ja existe no banco de dados 
routes.post('/signUp', users.registerUser); // rota de cadastro de novo usuário.
routes.post('/login', users.login); // rota de geração de token para autorização 
// rotas de Usuários VVV
routes.put('/editUser',checkToken, users.editUser); // rota de edição de usuarios logados.
routes.get('/checkLogin', checkLogin); // rota de verificação de token valido.
// rotas de Clientes VVV
routes.post('/registerClient',checkToken, clients.registerClient); // rota de cadastro de novo cliente.
routes.put('/editClient', checkLogin, clients.editClient); // rota de edição de cliente cadastrado
routes.put('/editAddres', checkLogin, clients.editAddres); // rota de edicção de Endereço de Cliente cadastrado.
 
module.exports = routes;