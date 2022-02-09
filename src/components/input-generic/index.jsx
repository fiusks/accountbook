import "./style.scss";
import { useState } from "react";
import useUser from "../../hooks/useUser";
// import showpassword from "../../assets/showPass.svg";

export function Input({ name, required }) {
  const feminino = ["UF", "Cidade", "Senha"];
  const { clientForm, setClientForm } = useUser();
  const [errorMessage, setErrorMessage] = useState([]);

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
  }

  function handleFormChange(event) {
    setClientForm({ ...clientForm, [event.target.name]: event.target.value });
  }

  function handleErrorMsg(msg) {
    setErrorMessage((previousState) => [...previousState, msg]);
  }

  function handleFormSubmit() {
    //forma completamente manual
    setErrorMessage([]);

    const field = clientForm[name];
    const requiredFields = ["name", "email", "cpf", "phone"];
    if (requiredFields.includes(name)) {
      if (!field) {
        setErrorMessage((previousState) => [
          ...previousState,
          `O campo ${nameTranslated.toLocaleLowerCase()} é obrigatório`,
        ]);
      }
    }

    switch (name) {
      case "email":
        if (typeof clientForm["email"] !== "undefined") {
          let lastAtPos = clientForm["email"].lastIndexOf("@");
          let lastDotPos = clientForm["email"].lastIndexOf(".");

          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              clientForm["email"].indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              clientForm["email"].length - lastDotPos > 2
            )
          ) {
            setErrorMessage((previousState) => [
              ...previousState,
              "O fomato do email é inválido",
            ]);
          }
        }
        break;

      case "cpf":
        if (field.length !== 11) {
          setErrorMessage((previousState) => [
            ...previousState,
            `O fomato do ${nameTranslated.toLocaleLowerCase()} é inválido`,
          ]);
        }
        break;

      case "phone":
        if (field.match(/^[0-9]+$/) == null) {
          setErrorMessage((previousState) => [
            ...previousState,
            `O ${nameTranslated.toLocaleLowerCase()} deve conter apenas números`,
          ]);
        }
        if (field.length > 11) {
          handleErrorMsg(
            `O formato do ${nameTranslated.toLocaleLowerCase()} é inválido`
          );
        }
        break;

      case "zipcode":
        if (field.match(/^[0-9]+$/) == null) {
          setErrorMessage((previousState) => [
            ...previousState,
            `O ${nameTranslated} deve conter apenas números`,
          ]);
        }
        if (field.length !== 8) {
          setErrorMessage((previousState) => [
            ...previousState,
            `O fomato do ${nameTranslated} é inválido`,
          ]);
        }
        break;
    }
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
        value={clientForm[name]}
        onChange={handleFormChange}
      />
      {errorMessage.length > 0 && <p>{errorMessage[0]}</p>}
      {/* <button onClick={handleFormSubmit}>Testando</button> */}
    </div>
  );
}

export function IconInput({ name, icon }) {
  const [showIcon, setShowIcon] = useState(false);
  const iconInputStyle = { position: "absolute", top: "12px", right: "0px" };
  const inputStyle = { position: "relative" };
  return (
    <div style={inputStyle}>
      <input
        className="icon-input"
        name={name}
        placeholder={name === "password" ? "" : "Pesquisar..."}
      />
      <img style={iconInputStyle} src={icon} />
    </div>
  );
}
