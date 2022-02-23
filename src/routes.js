const express = require("express");
const routes = express();

const validateToken = require("./controllers/validateToken/validadeToken");

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

const createBill = require("./controllers/bills/createBill");
const getClients = require("./controllers/clients/getClient");
const listClientBills = require("./controllers/bills/listClientBills");
const getBills = require("./controllers/bills/getBills");
const clientNameFilter = require("./controllers/clients/clientFilter");
const editBill = require("./controllers/bills/editBill");
const searchBill = require("./controllers/bills/searchBill");

// rotas de Cadastro/Login VVV
routes.get("/verifyEmail/:email", verifyEmail); // rota de verificação de email cadastrado.
routes.post("/signUp", registerUser); // rota de cadastro de novo usuário.
routes.post("/login", login); // rota de geração de token para autorização
routes.put("/editUser/", checkToken, validateForm, editUser); // rota de edição de usuarios logados.

// rotas de Clientes VVV
routes.post("/registerClient", checkToken, validateForm, registerClient); // rota de cadastro de novo cliente.
routes.get("/listClients", checkToken, listClients);
routes.put("/editClient/:id", checkToken, validateForm, editClient); // rota de edição de cliente cadastrado.
routes.get("/listHome", checkToken, listBills); //listagem dos dados da home.
routes.get("/getClients/:id", checkToken, getClients);

//rotas de Cobranças VVV
routes.get("/listClientBills/:clientId", checkToken, listClientBills);
routes.get("/getBills/:pesquisa", checkToken, getBills);
routes.get("/searchBills", checkToken, searchBill);
routes.post("/searchBills", checkToken, searchBill);
routes.post("/registerBill", checkToken, createBill);
routes.put("/editBill", checkToken, editBill);

routes.get("/validateToken", validateToken);

//Rotas para testes VV
routes.get('/filterClientName/:pesquisa', checkToken, clientNameFilter)

module.exports = routes;
