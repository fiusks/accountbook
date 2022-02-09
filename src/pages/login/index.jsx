import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { InputEmail, InputSenha } from "../../components/inputs";
import "./style.scss";
import ErrorMessage from "../../components/errorMessage";
import useAuth from "../../hooks/useAuth";


function Login() {
  const navigate = useNavigate();
  const { setToken, setIsAuthenticated } = useAuth();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    errorEmail: false,
    errorPassword: false,
  });

  function handleRedirect() {
    navigate("/dashboard/home");
  }

  async function checkLogin(token) {
    try {

      const response = await fetch(`https://api-teste-equipe-6.herokuapp.com/checkLogin`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },

      })
      const data = await response.json();
      if (data.validToken) {
        setIsAuthenticated(true);
        handleRedirect();
        return
      }
      setIsAuthenticated(false);
      handleRedirect();
      return


    } catch (error) {

    }

  }

  async function catchToken() {
    try {
      const user = {
        email: inputEmail,
        senha: inputPassword
      }

      const response = await fetch('https://api-teste-equipe-6.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      const data = await response.json();

      if (data.message !== 'Login efetuado com sucesso') {
        if (data.message === `Password doesn't check with E-mail ${inputEmail}.`) {
          setPasswordMessage('Senha incorreta!');
          setErrorMessage({
            ...errorMessage, errorPassword: true

          });
          return;
        }

        setEmailMessage('Email não cadastrado!');
        setErrorMessage({
          ...errorMessage, errorEmail: true

        });

        return;
      }

      setToken(data.token);
      checkLogin(data.token);

    } catch (error) {

    }

  }



  async function handleLogin() {
    if (!verifyInput()) {
      return;
    }
    catchToken();

  }

  function verifyInput() {
    if (!inputEmail || !inputPassword) {
      setEmailMessage("O campo e-mail deve ser preenchido!");
      setPasswordMessage("O campo senha deve ser preenchido!")

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
              <ErrorMessage text={passwordMessage} />
            )}
          </div>
          <button onClick={handleLogin}>Entrar</button>
        </div>
        <span>
          Ainda não possui uma conta?{" "}
          <NavLink to={"/signup"}>Cadastre-se</NavLink>
        </span>
      </div>
    </div>
  );
}

export default Login;
