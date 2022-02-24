import "./style.scss";
import useUser from "../../hooks/useUser";
import showpassword from "../../assets/showPass.svg";
import hidepassword from "../../assets/hidePass.svg";
import magnifierIcon from "../../assets/images/magnifiericon.svg";

export function Input({ name, required, errorMessage, value, dataUpdate }) {
  const feminino = ["UF", "Cidade", "Senha"];
  const { setClientForm, formSubmitted, setUserForm } = useUser();

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
    if (Object.keys(dataUpdate).length === 6) {
      setUserForm({ ...dataUpdate, [event.target.name]: event.target.value });
    } else {
      setClientForm({ ...dataUpdate, [event.target.name]: event.target.value });
    }
  }

  return (
    <div className="input-label-container">
      <label htmlFor={name}>{`${nameTranslated}${required ? "*" : ""}`}</label>
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

export function PasswordInput({ name, errorMessage, value, dataUpdate }) {
  const { formSubmitted, setUserForm, passwordState, setPasswordState } =
    useUser();

  function handleFormChange(event) {
    setUserForm({ ...dataUpdate, [event.target.name]: event.target.value });
  }
  function inputName() {
    if (name === "password") {
      return "Nova senha";
    } else if (name === "checkpassword") {
      return "Repita a senha";
    }
  }
  return (
    <div className="password-input">
      <label htmlFor={name}>{inputName()}</label>
      <input
        type={passwordState ? "text" : "password"}
        className="icon-input"
        name={name}
        value={value}
        onChange={handleFormChange}
        placeholder={
          name === "password"
            ? "Digite a sua nova senha"
            : "Repita a sua nova senha"
        }
      />
      <img
        className="img-input"
        src={passwordState ? showpassword : hidepassword}
        alt={passwordState ? "show password icon" : "hide password icon"}
        onClick={() => setPasswordState(!passwordState)}
      />
      {errorMessage[name] && formSubmitted ? <p>{errorMessage[name]}</p> : ""}
    </div>
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
