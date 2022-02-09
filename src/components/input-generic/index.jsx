import "./style.scss";
import useUser from "../../hooks/useUser";
// import showpassword from "../../assets/showPass.svg";

export function Input({ name, required, errorMessage }) {
  const feminino = ["UF", "Cidade", "Senha"];
  const { clientForm, setClientForm, formSubmitted } = useUser();

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
    setClientForm({ ...clientForm, [event.target.name]: event.target.value });
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
      {errorMessage[name] && formSubmitted ? <p>{errorMessage[name]}</p> : ""}
    </div>
  );
}

export function IconInput({ name, icon }) {
  const iconInputStyle = { position: "absolute", top: "12px", right: "0px" };
  const inputStyle = { position: "relative" };
  return (
    <div style={inputStyle}>
      <input
        className="icon-input"
        name={name}
        placeholder={name === "password" ? "" : "Pesquisar..."}
      />
      <img style={iconInputStyle} src={icon} alt="magnifier icon" />
    </div>
  );
}
