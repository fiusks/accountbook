import { Link } from "react-router-dom";
import "./style.scss";
import selected from "../../assets/screen-selected.svg";
import select from "../../assets/screen-select.svg";

function CardLogout() {
  return (
    <div className="card-logout">
      <div className="conteiner">
        <h1>Adicione seus dados</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-inputs">
            <label htmlFor="nome">Nome*</label>
            <input placeholder="Digite seu nome" id="nome" type="text" />
            <label htmlFor="email">E-mail*</label>
            <input placeholder="Digite seu email" id="email" type="text" />
          </div>
          <button>Continuar</button>
        </form>
        <span>
          Já possui uma conta? Faça seu
          <Link to="/login">Login</Link>
        </span>
      </div>
      <div className="screens">
        <img src={selected} alt="" />
        <img src={select} alt="" />
        <img src={select} alt="" />
      </div>
    </div>
  );
}

export default CardLogout;
