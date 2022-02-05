import { Link } from "react-router-dom";
import "./style.scss";

function CardSingup({
  children,
  refRePass,
  refPass,
  setInputRePassword,
  inputRePassword,
  inputPassword,
  setInputPassword,
}) {
  //TODO fazer a comparação das senhas
  function handleMatchPassword() {
    if (inputRePassword !== inputPassword) {
      refRePass.current.classList.add("error");
    }
  }
  return (
    <div className="card-singup">
      <div className="conteiner">
        <h1>Adicione seus dados</h1>
        <div className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-inputs">{children}</div>
          <button onClick={handleMatchPassword}>Continuar</button>
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
