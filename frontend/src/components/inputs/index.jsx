import { useState } from "react";
import "./style.scss";
import hidePass from "../../assets/hidePass.svg";
import showPass from "../../assets/showPass.svg";
import magnifierIcon from "../../assets/images/magnifiericon.svg";

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

export function InputSenha({ placeholder, title, inputState, setInputState }) {
  const [state, setState] = useState("password");
  function handleChangeVisibility() {
    setState(state === "password" ? "text" : "password");
  }
  return (
    <>
      <label htmlFor="pass">{title}</label>
      <div className="inputPassword">
        <input
          placeholder={placeholder}
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

export function SearchInput({ value, onChange, searchFunction, onKeyUp }) {
  return (
    <div className="search-input">
      <input
        className="icon-input"
        name="search"
        placeholder="Pesquisar..."
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <img
        className="img-input"
        src={magnifierIcon}
        alt={"magnifier icon"}
        style={{ cursor: "pointer" }}
        onClick={searchFunction}
      />
    </div>
  );
}
