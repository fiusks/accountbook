import { Router } from 'express'
import validateToken from "../controllers/validateToken/validadeToken";
import login from "../controllers/users/login";
import registerUser from "../controllers/users/registerUser";
import checkToken from "../middlewares/checkToken";
import validateForm from "../validation/validateForm";
import editUser from "../controllers/users/editUser";
import registerClient from "../controllers/clients/registerClient";
import listClients from "../controllers/clients/listClients";
import editClient from "../controllers/clients/editClient";
import listBills from "../controllers/bills/listBills";
import verifyEmail from "../controllers/users/verifyEmail";
import createBill from "../controllers/bills/registerBill";
import getClient from "../controllers/clients/getClient";
import listClientBills from "../controllers/bills/listClientBills";
import getBills from "../controllers/bills/getBills";
import clientNameFilter from "../controllers/clients/clientFilter";
import editBill from "../controllers/bills/editBill";
import searchBill from "../controllers/bills/searchBill";
import listFilteredClients from "../controllers/clients/listFilteredClients";
import deleteBill from "../controllers/bills/deleteBill";
import listFilteredBills from "../controllers/bills/listFilteredBills";

const router = Router()

// rotas de Cadastro/Login VVV
router.get("/verifyEmail/:email", verifyEmail); // rota de verificação de email cadastrado.
router.post("/signUp", registerUser); // rota de cadastro de novo usuário.
router.post("/login", login); // rota de geração de token para autorização
router.put("/editUser/", checkToken, validateForm, editUser); // rota de edição de usuarios logados.

// rotas de Clientes VVV
router.get("/listClients", checkToken, listClients);
router.post("/listFilteredClients", checkToken, listFilteredClients);
router.post("/registerClient", checkToken, validateForm, registerClient); // rota de cadastro de novo cliente.
router.put("/editClient/:id", checkToken, validateForm, editClient); // rota de edição de cliente cadastrado. FUTURAS IMPLEMENTAÇÕES
router.get("/listHome", checkToken, listBills); //listagem dos dados da home
router.get("/getClient/:id", checkToken, getClient);

//rotas de Cobranças VVV
router.get("/listClientBills/:clientId", checkToken, listClientBills);
router.get("/getBills", checkToken, getBills);
router.post("/listFilteredBills", checkToken, listFilteredBills);
router.post("/searchBills", checkToken, validateForm, searchBill);
router.post("/registerBill", checkToken, validateForm, createBill);
router.put("/editBill", checkToken, editBill);
router.delete("/deleteBill/:id", checkToken, deleteBill);

router.get("/validateToken", validateToken);

//Rotas para testes VV
router.get("/filterClientName/:pesquisa", checkToken, clientNameFilter);

export default router;
