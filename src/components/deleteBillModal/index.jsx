import "./style.scss";
import alerta from "../../assets/images/alerta.svg";
import close from "../../assets/images/close.svg";
import closeBlue from "../../assets/images/close-blue.svg";
import closeRed from "../../assets/images/close-red.svg";
import falhaIcon from "../../assets/images/falha-icon.svg";
import sucessoIcon from "../../assets/images/sucesso-icon.svg";
import { useRef } from "react";
import useUser from "../../hooks/useUser";

export function DeleteBillModal() {
    const { setDeleteBill } = useUser();
    const sucessoRef = useRef();
    const falhaRef = useRef();
    const cardRef = useRef();

    function deleteBill() {
        cardRef.current.style.display = "flex";
    };

    function DeleteBill(props) {
        function handleClickClose() {
            cardRef.current.style.display = "none";
        };

        async function handleClickSim() {
            if (props.status === "pendente" && props.dataVencimento >= new Date()) {
                await fetch(`https://api-testes-equipe-06.herokuapp.com/deleteBill/${props.cobrancaId}`, {
                    method: 'DELETE'
                });

                cardRef.current.style.display = "none";

                setDeleteBill(setDeleteBill ? false : true); 

                sucessoRef.current.style.display = "flex";
            } else {
                cardRef.current.style.display = "none";

                falhaRef.current.style.display = "flex";
            };
        };

        return (
            <div className="card" ref={cardRef}>
                <img className="close-icon" src={close} alt="Fechar" onClick={handleClickClose} />
                <img className="alerta-icon" src={alerta} alt="Alerta" />
                <p className="card-text">Tem certeza que deseja excluir esta cobrança?</p>
                <button className="deletar-cobranca-button-nao" onClick={handleClickClose}>Não</button>
                <button className="deletar-cobranca-button-sim" onClick={handleClickSim}>Sim</button>
            </div>
        )
    };

    function DeleteBillSucess() {
        function handleClickClose() {
            sucessoRef.current.style.display = "none";
        };

        return (
            <div className="sucesso" ref={sucessoRef}>
                <img className="sucesso-icon" src={sucessoIcon} alt="Sucesso" />
                <p className="sucesso-text">Cobrança excluída com sucesso!</p>
                <img className="close-icon-blue" src={closeBlue} alt="Fechar" onClick={handleClickClose} />
            </div>
        )
    };

    function DeleteBillFail() {
        function handleClickClose() {
            falhaRef.current.style.display = "none";
        };

        return (
            <div className="falha" ref={falhaRef}>
                <img className="falha-icon" src={falhaIcon} alt="Falhou" />
                <p className="falha-text">Esta cobrança não pode ser excluída!</p>
                <img className="close-icon-red" src={closeRed} alt="Fechar" onClick={handleClickClose} />
            </div>
        )
    };

    return { DeleteBill, deleteBill, DeleteBillFail, DeleteBillSucess }
}