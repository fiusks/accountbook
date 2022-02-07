import { useState } from "react";
import { NavLink } from "react-router-dom";
import { InputEmail, InputSenha } from "../../components/inputs";
import "./style.scss";
import ErrorMessage from "../../components/errorMessage";

function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    errorEmail: false,
    errorPassword: false,
  });

  function handleSingup() {
    if (!verifyInput()) {
      return;
    }
  }
  function verifyInput() {
    if (!inputEmail || !inputPassword) {
      setEmailMessage("O campo e-mail deve ser preenchido!");

      if (!inputEmail) {
        setErrorMessage({ ...errorMessage, errorEmail: true });
        return false;
      }
      if (!inputPassword) {
        setErrorMessage({ ...errorMessage, errorPassword: true });
        return false;
      }
    }
    if (!inputEmail.match(/@/)) {
      setEmailMessage("E-mail inválido!");
      return false;
    }
    setErrorMessage({
      errorEmail: false,
      errorPassword: false,
    });
    return true;
  }
  return (
    <div className="login">
      <div className="container-left">
        <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
      </div>
      <div className="container-right">
        <div className="form">
          <h1>Faça seu login</h1>
          <div className="inputs">
            <InputEmail inputEmail={inputEmail} setInputEmail={setInputEmail} />
            {errorMessage.errorEmail && <ErrorMessage text={emailMessage} />}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <InputSenha
                inputState={inputPassword}
                setInputState={setInputPassword}
                placeholder="Digite sua senha"
                title="Senha"
              />
              <NavLink className="forgot-pass" to="/singup">
                Esqueceu a senha?
              </NavLink>
            </div>
            {errorMessage.errorPassword && (
              <ErrorMessage text={"O campo senha precisa estar preenchido"} />
            )}
          </div>
          <button onClick={handleSingup}>Entrar</button>
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
