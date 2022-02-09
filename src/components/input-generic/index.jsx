import "./style.scss";
import useUser from "../../hooks/useUser";
import showpassword from "../../assets/showPass.svg";
import hidepassword from "../../assets/hidePass.svg";
import magnifierIcon from "../../assets/images/magnifiericon.svg";
import { useState } from "react";

export function Input({ name, required, errorMessage, value, dataUpdate }) {
  const feminino = ["UF", "Cidade", "Senha"];
  const { setClientForm, formSubmitted } = useUser();

  let nameTranslated = "";

  switch (name) {
    case "name":
      nameTranslated = "Nome";
      break;
    case "email":
      nameTranslated = "E-mail";
      break;
    case "cpf":
      nameTranslated = "CPF";
      break;
    case "phone":
      nameTranslated = "Telefone";
      break;
    case "address":
      nameTranslated = "Endereço";
      break;
    case "complement":
      nameTranslated = "Complemento";
      break;
    case "zipcode":
      nameTranslated = "CEP";
      break;
    case "district":
      nameTranslated = "Bairro";
      break;
    case "city":
      nameTranslated = "Cidade";
      break;
    case "state":
      nameTranslated = "UF";
      break;
    case "password":
      nameTranslated = "Senha";
      break;
    case "search":
      nameTranslated = "Pesquisa";
      break;
    default:
      return;
  }

  function handleFormChange(event) {
    setClientForm({ ...dataUpdate, [event.target.name]: event.target.value });
  }

  return (
    <div className="input-label-container">
      <label>{`${nameTranslated}${required ? "*" : ""}`}</label>
      <input
        name={name}
        placeholder={`Digite ${feminino.includes(nameTranslated) ? "a" : "o"} ${
          nameTranslated === "UF"
            ? nameTranslated
            : nameTranslated.toLocaleLowerCase()
        }`}
        value={value}
        onChange={handleFormChange}
      />
      {errorMessage[name] && formSubmitted ? <p>{errorMessage[name]}</p> : ""}
    </div>
  );
}

export function PasswordInput({ name }) {
  const [iconState, setIconState] = useState();

  function passworIconstate() {
    if (iconState === true) {
      return showpassword;
    } else {
      return hidepassword;
    }
  }
  function handlePasswordView() {
    if (iconState === true) {
      return "text";
    } else {
      return "password";
    }
  }

  function inputName() {
    if (name === "password") {
      return "Nova senha";
    } else if (name === "passwordcheck") {
      return "Repita a senha";
    }
  }
  return (
    <div className="password-input">
      <label>{inputName()}</label>
      <input
        type={name !== "search" ? handlePasswordView() : "text"}
        className="icon-input"
        name={name}
        placeholder={name === "search" ? "Pesquisar..." : ""}
      />
      <img
        className="img-input"
        src={name === "search" ? magnifierIcon : passworIconstate()}
        alt={name === "search" ? "magnifier icon" : "hide/show password icon"}
        onClick={name !== "search" ? () => setIconState(!iconState) : ""}
      />
    </div>
  );
}

export function SearchInput() {
  return (
    <div className="search-input">
      <input className="icon-input" name="search" placeholder="Pesquisar..." />
      <img className="img-input" src={magnifierIcon} alt={"magnifier icon"} />
    </div>
  );
}
