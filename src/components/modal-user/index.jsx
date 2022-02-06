import "./style.scss";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

function UserModal() {
  const { openModal, setOpenModal } = useUser();
  return (
    <div className={`modal-background ${!openModal && "disabled"} `}>
      <div className="modal-container">
        <div className="modal-card">
          <div className="modal-header">
            <h3>Edite o seu cadastro</h3>
            <img
              src={closeIcon}
              alt="close icon"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div className="modal-body">
            <form>
              <label>Nome*</label>
              <input />
              <label>E-mail</label>
              <input />
              <div className="modal-flex-row">
                <div className="modal-column-row">
                  <label>CPF</label>
                  <input />
                </div>
                <div className="modal-column-row">
                  <label>Telefone</label>
                  <input />
                </div>
              </div>
              <label>Nova senha</label>
              <input />
              <label>Confirmar senha</label>
              <input />
              <button onClick={() => setOpenModal(false)}>Aplicar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserModal;
