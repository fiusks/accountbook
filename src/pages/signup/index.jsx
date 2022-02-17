import { useState } from "react";
import select from "../../assets/screen-select.svg";
import selected from "../../assets/screen-selected.svg";
import CardSingup from "../../components/cardSingupComponent";
import ErrorMessage from "../../components/errorMessage";
import { InputEmail, InputNome, InputSenha } from "../../components/inputs";
import ProgressBar from "../../components/progressComponent";
import CompletedSingup from "../../components/signupSucessful";
import "./style.scss";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [inputPassword, setInputPassword] = useState("");
  const [inputRePassword, setInputRePassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [stepSingup, setStepSingup] = useState("email");
  const [errorMessage, setErrorMessage] = useState({
    errorEmail: false,
    errorName: false,
    errorPassword: false,
    errorRePassword: false,
  });
  const [emailMessage, setEmailMessage] = useState(
    "O campo e-mail deve ser preenchido!"
  );
  const [passwordMessage, setPasswordMessage] = useState("");

  function handleRedirect() {
    setTimeout(() => navigate("/login"), 2000);
  }

  async function handleSingup(params) {
    if (!verifyInput(params)) {
      return;
    }

    if (stepSingup === "email") {
      try {
        const response = await fetch(
          `https://api-testes-equipe-06.herokuapp.com/verifyEmail/${inputEmail}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.success === "E-mail disponível") {
          setStepSingup("password");
          return;
        }

        setEmailMessage("Este email já está cadastrado");
        setErrorMessage({
          ...errorMessage,
          errorEmail: true,
        });
      } catch (error) {
        console.log(error.message);
      }
      return;
    }

    if (stepSingup === "password") {
      if (inputPassword !== inputRePassword) {
        setPasswordMessage("As senhas não coincidem");
        setErrorMessage({
          ...errorMessage,
          errorRePassword: true,
        });

        return;
      }

      const user = {
        user: {
          name: inputName,
          email: inputEmail,
          password: inputPassword,
        },
      };

      try {
        const response = await fetch(
          "https://api-testes-equipe-06.herokuapp.com/signUp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        const data = await response.json();
        if (data.success === "Novo Usuario Cadastrado") {
          setStepSingup("success");
          handleRedirect();
        }
      } catch (error) {}
      return;
    }
  }

  function verifyInput(params) {
    if (!params[1] || !params[0]) {
      setEmailMessage("O campo e-mail deve ser preenchido!");

      if (!params[1]) {
        setErrorMessage({ ...errorMessage, [params[3]]: true });
        return false;
      }
      if (!params[0]) {
        setErrorMessage({ ...errorMessage, [params[2]]: true });
        return false;
      }
    }
    if (!inputEmail.match(/@/)) {
      setEmailMessage("E-mail inválido!");
      return false;
    }
    setErrorMessage({
      ...errorMessage,
      [params[2]]: false,
      [params[3]]: false,
    });
    return true;
  }
  return (
    <div className="singup">
      <ProgressBar stepSingup={stepSingup}></ProgressBar>
      <div className="singup-section">
        {(stepSingup !== "sucess" && (
          <CardSingup
            inputPassword={inputPassword}
            inputRePassword={inputRePassword}
            inputName={inputName}
            inputEmail={inputEmail}
            handleSingup={handleSingup}
            stepSingup={stepSingup}
            title={
              stepSingup === "email"
                ? "Adicione seus dados"
                : "Escolha uma senha"
            }
          >
            {(stepSingup === "email" && (
              <>
                <InputNome inputName={inputName} setInputName={setInputName} />
                {errorMessage.errorName && (
                  <ErrorMessage text="O campo nome deve ser preenchido!" />
                )}
                <InputEmail
                  inputEmail={inputEmail}
                  setInputEmail={setInputEmail}
                />
                {errorMessage.errorEmail && (
                  <ErrorMessage text={emailMessage} />
                )}
              </>
            )) ||
              (stepSingup === "password" && (
                <>
                  <InputSenha
                    placeholder="Digite sua senha"
                    inputState={inputPassword}
                    setInputState={setInputPassword}
                    title="senha"
                  />
                  {errorMessage.errorPassword && (
                    <ErrorMessage text="O campo senha deve ser preenchido!" />
                  )}
                  <InputSenha
                    placeholder="Repita a sua senha"
                    inputState={inputRePassword}
                    setInputState={setInputRePassword}
                    title="repetir senha"
                  />
                  {errorMessage.errorRePassword && (
                    <ErrorMessage text={passwordMessage} />
                  )}
                </>
              ))}
          </CardSingup>
        )) ||
          (stepSingup === "sucess" && <CompletedSingup />)}
        <div className="nav">
          <img
            onClick={() => setStepSingup("email")}
            src={stepSingup === "email" ? selected : select}
            alt="insira seus dados"
          />
          <img
            onClick={() => setStepSingup("password")}
            src={stepSingup === "password" ? selected : select}
            alt="Insira senha"
          />
          <img
            src={stepSingup === "sucess" ? selected : select}
            alt="Cadastrado com sucesso"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
