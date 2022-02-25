import "./style.scss";
import succesToastIcon from "../../assets/images/successtoasticon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

export default function ToastComponent() {
  const { setClientToast } = useUser();
  return (
    <div className="toast-success-container">
      <img src={succesToastIcon} alt="success icon" />
      <p>Cadastro concluído com sucesso</p>
      <img
        onClick={() => setClientToast(false)}
        className="close-icon"
        src={closeIcon}
        alt="close icon button"
      />
    </div>
  );
}
