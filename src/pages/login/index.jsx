import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/useContext";
import "./style.scss";
import { InputEmail, InputSenha } from "../../components/inputs";

function Login() {
  const value = useContext(AuthContext);

  return (
    <div className="login">
      <div className="container-left">
        Gerencie todos os pagamentos da sua empresa em um só lugar.
      </div>
      <div className="container-right">
        <div className="form">
          <h1>Faça seu login</h1>
          <div className="inputs">
            <InputEmail />
            <InputSenha placeholder="Digite sua senha" title="Senha" />
            <NavLink className="forgot-pass" to="/singup">
              Esqueceu a senha?
            </NavLink>
          </div>
          <button>Entrar</button>
        </div>
        <span>
          Ainda não possui uma conta?{" "}
          <NavLink to={"/singup"}>Cadastre-se</NavLink>
        </span>
      </div>
    </div>
  );
}

export default Login;
