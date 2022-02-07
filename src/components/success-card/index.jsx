import "./style.scss";
import completedIcon from "../../assets/images/completed.svg";

export default function SuccessCard() {
  return (
    <div className="success-card">
      <img src={completedIcon} alt="complete circular icon" />
      <h2>Cadastro alterado com sucesso!</h2>
    </div>
  );
}
