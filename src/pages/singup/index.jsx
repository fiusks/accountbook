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

  function handleSingup(params) {
    verifyInput(params);
  }
  function verifyInput(params) {
    console.log(params);
    // if (!inputValue) {
    //   setErrorMessage({ ...errorMessage, [inputErrorName]: true });
    //   return;
    // }
    // if (!inputValue2) {
    //   setErrorMessage({ ...errorMessage, [inputErrorName]: true });
    //   return;
    // }
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
                  <ErrorMessage text="O campo e-mail deve ser preenchido!" />
                )}
              </>
            )) ||
              (stepSingup === "password" && (
                <>
                  <InputSenha
                    inputState={inputPassword}
                    setInputState={setInputPassword}
                    title="senha"
                  />
                  {errorMessage.errorName && (
                    <ErrorMessage text="O campo nome deve ser preenchido!" />
                  )}
                  <InputSenha
                    inputState={inputRePassword}
                    setInputState={setInputRePassword}
                    title="repetir senha"
                  />
                </>
              ))}
          </CardSingup>
        )) ||
          (stepSingup === "sucess" && <CompletedSingup />)}
        <div className="nav">
          <img src={selected} alt="" />
          <img src={select} alt="" />
          <img src={select} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Singup;
