import { Route, Routes } from "react-router-dom";
import Redirecting from "./components/redirectComponent";
import AuthProvider from "./contexts/AuthProvider";
import Layout from "./components/layout";
import Home from "./pages/home";
import Clientes from "./pages/clientes";
import Cobrancas from "./pages/cobrancas";
import Login from "./pages/login";
import Signup from "./pages/signup";
import RequireAuth from "./components/requireAuthComponent";
import ClientsDetails from "./pages/detalhes-do-cliente";

function Rotas() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="cobrancas" element={<Cobrancas />} />
          <Route path="detalhesCliente" element={<ClientsDetails />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Redirecting />} />
      </Routes>
    </AuthProvider>
  );
}

export default Rotas;
