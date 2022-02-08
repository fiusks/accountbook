import { Route, Routes } from "react-router-dom";
import Redirecting from "./components/redirectComponent";
import AuthProvider from "./contexts/AuthProvider";
import Layout from "./components/layout";
import Home from "./pages/home";
import Clientes from "./pages/clientes";
import Cobrancas from "./pages/cobrancas";
import Login from "./pages/login";
import Singup from "./pages/singup";

function Rotas() {
  return (
    <AuthProvider value={{ msg: "login" }}>
      <Routes>
        {/* <Route path="/" element={<Redirecting />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/cobrancas" element={<Cobrancas />} />
        </Route>
        <Route path="/singup" element={<Singup />} />
      </Routes>
    </AuthProvider>
  );
}

export default Rotas;
