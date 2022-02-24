import "./style.scss";
import alerta from "../../assets/images/alerta.svg";
import close from "../../assets/images/close.svg";
import closeBlue from "../../assets/images/close-blue.svg";
import closeRed from "../../assets/images/close-red.svg";
import falhaIcon from "../../assets/images/falha-icon.svg";
import sucessoIcon from "../../assets/images/sucesso-icon.svg";
import { useRef } from "react";
import useUser from "../../hooks/useUser";

function DeleteBill(props) {
    const { setDeleteBill, setShowDeleteBillModal, setToastError, setToastErrorMessage, setToastSuccessMessage, setClientToast } = useUser();

    async function handleClickSim() {
        if (props.status === "pendente" && props.dataVencimento >= new Date()) {
            await fetch(`${process.env.REACT_APP_BASE_URL}deleteBill/${props.cobrancaId}`, {
                method: 'DELETE'
            });

            setToastSuccessMessage("Cobrança excluída com sucesso!");

            setShowDeleteBillModal(false);

            setClientToast(true);
            
            setDeleteBill(setDeleteBill ? false : true);
        } else {
            setShowDeleteBillModal(false);

            setToastErrorMessage("Esta cobrança não pode ser excluída!");

            setToastError(true);
        }
    };

    return (
        <div className="card-master">
            <div className="card">
                <img className="close-icon" src={close} alt="Fechar" onClick={() => setShowDeleteBillModal(false)} />
                <img className="alerta-icon" src={alerta} alt="Alerta" />
                <p className="card-text">Tem certeza que deseja excluir esta cobrança?</p>
                <div className="display-flex">
                    <button className="deletar-cobranca-button-nao" onClick={() => setShowDeleteBillModal(false)}>Não</button>
                    <button className="deletar-cobranca-button-sim" onClick={handleClickSim}>Sim</button>
                </div>
            </div>
        </div>
    )
};
export default DeleteBill