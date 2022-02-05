import "./style.scss";
import completed from "../../assets/completed.svg";

function CompletedSignup() {
  return (
    <div className="completed-signup">
      <div className="card-completed">
        <img src={completed} alt="Cadastro realizado" />
        <h1>Cadastro realizado com sucesso</h1>
      </div>
    </div>
  );
}

export default CompletedSignup;
