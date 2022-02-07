import { Link } from "react-router-dom";
import "./style.scss";

function CardSingup({
  children,
  title,
  handleSingup,
  inputEmail,
  inputName,
  inputPassword,
  inputRePassword,
  stepSingup,
}) {
  function chooseParams() {
    if (stepSingup === "email") {
      return [inputEmail, inputName, "errorEmail", "errorName"];
    }
    if (stepSingup === "password") {
      return [
        inputRePassword,
        inputPassword,
        "errorRePassword",
        "errorPassword",
      ];
    }
  }

  return (
    <div className="card-singup">
      <div className="conteiner">
        <h1>{title}</h1>
        <div className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-inputs">{children}</div>
          <button onClick={() => handleSingup(chooseParams())}>
            Continuar
          </button>
        </div>
        <span>
          Já possui uma conta? Faça seu
          <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default CardSingup;
