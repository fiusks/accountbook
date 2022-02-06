import { useState } from "react";
import "./style.scss";
import hidePass from "../../assets/hidePass.svg";
import showPass from "../../assets/showPass.svg";

export function InputNome({ setInputName, inputName }) {
  return (
    <>
      <label htmlFor="name">Nome*</label>
      <input
        onChange={(e) => setInputName(e.target.value)}
        value={inputName}
        placeholder="Digite seu nome"
        id="name"
        type="text"
      />
    </>
  );
}

export function InputEmail({ setInputEmail, inputEmail }) {
  return (
    <>
      <label htmlFor="email">E-mail*</label>
      <input
        onChange={(e) => setInputEmail(e.target.value)}
        value={inputEmail}
        placeholder="Digite seu email"
        id="email"
        type="text"
      />
    </>
  );
}

export function InputSenha({ title, inputState, setInputState }) {
  const [state, setState] = useState("password");
  function handleChangeVisibility() {
    setState(state === "password" ? "text" : "password");
  }
  return (
    <>
      <label htmlFor="pass">{title}</label>
      <div className="inputPassword">
        <input
          onChange={(e) => setInputState(e.target.value)}
          value={inputState}
          id="pass"
          type={state}
        />
        <img
          onClick={() => handleChangeVisibility()}
          src={state === "password" ? hidePass : showPass}
          alt={state === "password" ? "senha escondida" : "senha visível"}
        />
      </div>
    </>
  );
}
