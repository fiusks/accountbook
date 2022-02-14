const express = require("express");
const checkToken = require("../middlewares/checkToken");
const routes = express();
const validateForm = require("../validation/validateForm");

const login = require("../controllers/users/login");
const registerUser = require("../controllers/users/registerUser");
const editUser = require("../controllers/users/editUser");

const registerClient = require("../controllers/clients/registerClient");
const listClients = require("../controllers/clients/listClients");
const editClient = require("../controllers/clients/editClient");
const listBills = require("../controllers/bills/listBills");
const cors = require("cors");

// rotas de Cadastro/Login VVV
routes.get("/", registerUser); // rota de verificação de email cadastrado.
routes.post("/signUp", validateForm, registerUser); // rota de cadastro de novo usuário.
routes.post("/login", cors(), login); // rota de geração de token para autorização
// rotas de Usuários VVV

routes.put("/editUser", checkToken, validateForm, editUser); // rota de edição de usuarios logados.

// rotas de Clientes VVV
routes.get("/listClients", checkToken, listClients);
routes.post("/registerClient", checkToken, validateForm, registerClient); // rota de cadastro de novo cliente.
routes.put("/editClient", checkToken, validateForm, editClient); // rota de edição de cliente cadastrado. FUTURAS IMPLEMENTAÇÕES

routes.get("/listHome", checkToken, listBills); //listagem dos dados da home

module.exports = routes;
