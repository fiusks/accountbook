import "./style.scss";
import errorIcon from "../../assets/images/errorIcon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

export default function ToastComponentError() {
  const { setToastError, toastErrorMessage } = useUser();
  return (
    <div className="toast-error-container">
      <img src={errorIcon} alt="success icon" />
      <p>{toastErrorMessage}</p>
      <img
        onClick={() => setToastError(false)}
        className="close-icon"
        src={closeIcon}
        alt="close icon button"
      />
    </div>
  );
}
