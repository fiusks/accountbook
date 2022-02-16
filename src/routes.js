const express = require("express");
const routes = express();

const login = require("./controllers/users/login");
const registerUser = require("./controllers/users/registerUser");
const checkToken = require("./middlewares/checkToken");
const validateForm = require("./validation/validateForm");

const editUser = require("./controllers/users/editUser");
const registerClient = require("./controllers/clients/registerClient");
const listClients = require("./controllers/clients/listClients");
const editClient = require("./controllers/clients/editClient");
const listBills = require("./controllers/bills/listBills");
const verifyEmail = require("./controllers/users/verifyEmail");
const getClients = require("./controllers/clients/getClient");
const listClientBills = require("./controllers/bills/listClientBills");
const getBills = require("./Controllers/bills/getBills");

// rotas de Cadastro/Login VVV
routes.post("/login", login); // rota de geração de token para autorização
routes.get("/verifyEmail/:email", verifyEmail); // rota de verificação de email cadastrado.
routes.post("/signUp", registerUser); // rota de cadastro de novo usuário.

// rotas de Usuários VVV
routes.put("/editUser", checkToken, editUser); // rota de edição de usuarios logados.

// rotas de Clientes VVV
routes.get("/listClients", checkToken, listClients);
routes.post("/registerClient", checkToken, registerClient); // rota de cadastro de novo cliente.
routes.put("/editClient", checkToken, editClient); // rota de edição de cliente cadastrado. FUTURAS IMPLEMENTAÇÕES
routes.get("/listHome", checkToken, listBills); //listagem dos dados da home
routes.get("/getClients/:id", checkToken, getClients);

//rotas de Cobranças VVV
routes.get("/listClientBills/:clientId", checkToken, listClientBills);
routes.get('/getBills', getBills); // lembrar de por o checktoken

module.exports = routes;
