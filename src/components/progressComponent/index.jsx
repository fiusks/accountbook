import "./style.scss";
import done from "../../assets/Step-Done.svg";
import check from "../../assets/Step-Check.svg";
import undone from "../../assets/Step-Undone.svg";
import line from "../../assets/Line.svg";

function ProgressBar({ stepSingup }) {
  return (
    <div className="progress-singup">
      <div className="progress-bar">
        <img
          src={stepSingup === "email" ? done : check}
          alt="circle step progress"
        />
        <img className="line-img" src={line} alt="line step progress" />
        <img
          src={
            stepSingup === "email"
              ? undone
              : stepSingup === "password"
              ? done
              : check
          }
          alt="circle step progress"
        />
        <img className="line-img" src={line} alt="line step progress" />
        <img
          src={stepSingup === "sucess" ? check : undone}
          alt="circle step progress"
        />
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
          <p className="text title">Cadastro realizado com sucesso</p>
          <p className="text desc">E-mail e senha cadastrados com sucesso</p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
