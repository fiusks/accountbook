import "./style.scss";
import alerta from "../../assets/images/alerta.svg";
import close from "../../assets/images/close.svg";
import useUser from "../../hooks/useUser";
import { toastModalHandler } from "../../services/toastModalTimer";

function DeleteBill(props) {
  const {
    setDeleteBill,
    setShowDeleteBillModal,
    setToastMessage,
    setToastType,
    setShowToast,
    deleteBill,
  } = useUser();
  const token = document.cookie.split("=")[1];

  async function handleClickSim() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}deleteBill/${props.cobrancaId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data === "Cobrança deletada com sucesso.") {
        setToastType("success");
        setToastMessage("Cobrança excluída com sucesso!");
        setDeleteBill(deleteBill ? false : true);
      } else {
        console.log("aqui");
        setToastType("failed");
        setToastMessage("Esta cobrança não pode ser excluída!");
      }

      toastModalHandler(setShowDeleteBillModal, setShowToast);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="card-master">
      <div className="card">
        <img
          className="close-icon"
          src={close}
          alt="Fechar"
          onClick={() => setShowDeleteBillModal(false)}
        />
        <img className="alerta-icon" src={alerta} alt="Alerta" />
        <p className="card-text">
          Tem certeza que deseja excluir esta cobrança?
        </p>
        <div className="display-flex">
          <button
            className="deletar-cobranca-button-nao"
            onClick={() => setShowDeleteBillModal(false)}
          >
            Não
          </button>
          <button
            className="deletar-cobranca-button-sim"
            onClick={handleClickSim}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteBill;
