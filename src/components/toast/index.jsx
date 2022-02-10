import "./style.scss";
import succesToastIcon from "../../assets/images/successtoasticon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

function ToastComponent() {
  const { setToast } = useUser();
  return (
    <div className="toast-success-container">
      <img src={succesToastIcon} alt="success icon" />
      <p>Cadastro concluído com sucesso</p>
      <img
        onClick={() => setToast(false)}
        className="close-icon"
        src={closeIcon}
        alt="close icon button"
      />
    </div>
  );
}

export default ToastComponent;
