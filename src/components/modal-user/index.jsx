import "./style.scss";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";

function UserModal() {
  const { openModal, setOpenModal, userForm, setUserForm } = useUser();

  const errorMsg = (
    <span className="error-msg">Este campo deve ser preenchdio</span>
  );

  function handleSubmit(event) {
    event.preventDefault();
    setOpenModal(false);
    setUserForm({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      password: "",
      checkpassword: "",
    });
  }
  function handleFormChange(event) {
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
  }

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
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nome*</label>
              <input
                id="name"
                name="name"
                value={userForm.name}
                onChange={handleFormChange}
              />
              <label htmlFor="email">Nome*</label>
              <input
                id="email"
                name="email"
                value={userForm.email}
                onChange={handleFormChange}
              />

              <div className="modal-flex-row">
                <div className="modal-column-row">
                  <label>CPF</label>
                  <input
                    id="cpf"
                    name="cpf"
                    value={userForm.cpf}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="modal-column-row">
                  <label>Telefone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={userForm.phone}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <label>Nova senha</label>
              <input
                id="password"
                name="password"
                value={userForm.password}
                onChange={handleFormChange}
              />

              <label>Confirmar senha</label>
              <input
                id="checkedpassword"
                name="checkedpassword"
                value={userForm.checkedpassword}
                onChange={handleFormChange}
              />

              <button>Aplicar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserModal;
