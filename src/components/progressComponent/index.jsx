import "./style.scss";
import done from "../../assets/Step-Done.svg";
import check from "../../assets/Step-Check.svg";
import undone from "../../assets/Step-Undone.svg";
import line from "../../assets/Line.svg";

function ProgressBar() {
  return (
    <div className="progress-logout">
      <div className="progress-bar">
        <img src={check} />
        <img className="line-img" src={line} />
        <img src={done} />
        <img className="line-img" src={line} />
        <img src={undone} />
      </div>
      <div className="progress-text">
        <div className="message-email">
          <p className="text title">Cadastre-se</p>
          <p className="text desc">Por favor, escreva seu nome e e-mail</p>
        </div>
        <div className="message-password">
          <p className="text title">Escolha uma senha </p>
          <p className="text desc">Escolha uma senha segura</p>
        </div>
        <div className="message-done">
          <p className="text title" s>
            Cadastro realizado com sucesso
          </p>
          <p className="text desc">E-mail e senha cadastrados com sucesso</p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
