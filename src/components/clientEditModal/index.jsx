import "./style.scss";
import { Input, IconInput } from "../input-generic";
import clientIcon from "../../assets/images/clientsIcon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

function ClientEditForm() {
  const { setOpenClientModal } = useUser();
  return (
    <div className="modal-client-background">
      <div className="client-modal-container">
        <header>
          <img src={clientIcon} alt="client icon" />
          <h1>Cadastro do Cliente</h1>
          <img
            className="close-icon-btn"
            src={closeIcon}
            alt="close button icon"
            onClick={() => setOpenClientModal(false)}
          />
        </header>
        <div className="client-card-body">
          <form>
            <Input name="name" formValid={true} required />
            <Input name="email" formValid={true} required />
            <Input name="cpf" formValid={true} required />
            <Input name="phone" formValid={true} required />
            <Input name="address" formValid={true} />
            <Input name="complement" formValid={true} />
            <div className="pair-even-fields">
              <Input name="zipcode" formValid={true} />
              <Input name="district" formValid={true} />
            </div>
            <div className="pair-uneven-fields">
              <div className="input-field-big">
                <Input className="testando" name="city" formValid={true} />
              </div>
              <div className="growth-field-small">
                <Input name="state" formValid={true} />
              </div>
            </div>
            <div className="client-modal-footer">
              <button
                className="cancel"
                onClick={() => setOpenClientModal(false)}
              >
                Cancelar
              </button>
              <button className="add">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientEditForm;
