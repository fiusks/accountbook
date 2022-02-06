import { useState } from "react";
import select from "../../assets/screen-select.svg";
import selected from "../../assets/screen-selected.svg";
import CardSingup from "../../components/cardSingupComponent";
import ErrorMessage from "../../components/errorMessage";
import { InputEmail, InputNome, InputSenha } from "../../components/inputs";
import ProgressBar from "../../components/progressComponent";
import CompletedSingup from "../../components/singupSucessful";
import "./style.scss";

function Singup() {
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

  function handleSingup(params) {
    if (!verifyInput(params)) {
      return;
    }

    setStepSingup("password");
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
                    <ErrorMessage text="O campo repetir senha deve ser preenchido!" />
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
            onClick={() => setStepSingup("sucess")}
            src={stepSingup === "sucess" ? selected : select}
            alt="Cadastrado com sucesso"
          />
        </div>
      </div>
    </div>
  );
}

export default Singup;
