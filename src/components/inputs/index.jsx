import { useState } from "react";
import "./style.scss";
import hidePass from "../../assets/hidePass.svg";
import showPass from "../../assets/showPass.svg";

export function InputEmail() {
  const [inputName, setInputName] = useState("");
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

export function InputNome() {
  const [inputEmail, setInputEmail] = useState("");

  return (
    <>
      <label htmlFor="email">E-mail*</label>
      <input
        onChange={(e) => setInputEmail(e.target.value)}
        value={inputEmail}
        placeholder="Digite seu email"
        id="email"
        t
        ype="text"
      />
    </>
  );
}

export function InputSenha({ innerRef, title, inputState, setInputState }) {
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
          ref={innerRef}
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
