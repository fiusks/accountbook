import { Route, Routes } from "react-router-dom";
import Redirecting from "./components/redirectComponent";
import AuthProvider from "./contexts/AuthProvider";
import Home from "./pages/home";
import Login from "./pages/login";
import Singup from "./pages/singup";

function Rotas() {
  return (
    <AuthProvider value={{ msg: "login" }}>
      <Routes>
        <Route path="/" element={<Redirecting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singup" element={<Singup />} />
      </Routes>
    </AuthProvider>
  );
}

export default Rotas;
