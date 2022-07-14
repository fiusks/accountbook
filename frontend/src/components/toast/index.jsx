import "./style.scss";
import succesToastIcon from "../../assets/images/successtoasticon.svg";
import failToastIcon from "../../assets/images/falha-icon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

export default function ToastComponent() {
  const { setShowToast, toastMessage, toastType } = useUser();

  return (
    <div className={`generic-toast-container ${toastType} `}>
      <img
        src={toastType === "success" ? succesToastIcon : failToastIcon}
        alt={`${toastType} icon`}
      />
      <p>{toastMessage}</p>
      <img
        onClick={() => setShowToast(false)}
        className="close-icon"
        src={closeIcon}
        alt="close icon button"
      />
    </div>
  );
}
