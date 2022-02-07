import "./style.scss";
import closeIcon from "../../assets/images/closeicon.svg";
import SuccessCard from "../success-card";
import useUser from "../../hooks/useUser";
import { useState, useEffect } from "react";

function UserModal() {
  const { openModal, setOpenModal, userData } = useUser();
  const [successcCardOpen, setSuccessCardOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    checkpassword: "",
  });

  useEffect(function getUserData() {
    const userDataClientSide = userData;
    setUserForm({ ...userForm }, userDataClientSide);
  }, []);

  // const errorMsg = (
  //   <span className="error-msg">Este campo deve ser preenchdio</span>
  // );

  function handleSubmit(event) {
    event.preventDefault();
    setSuccessCardOpen(true);
    setTimeout(() => {
      setOpenModal(false);
      setSuccessCardOpen(false);
    }, 2000);
  }

  function handleFormChange(event) {
    setUserForm({ ...userForm, [event.target.name]: event.target.value });
  }

  return (
    <div className={`modal-background ${!openModal && "disabled"} `}>
      <div className="modal-container">
        {!successcCardOpen && (
          <div className="modal-card">
            <div className="modal-header">
              <h2>Edite o seu cadastro</h2>
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
                <label htmlFor="email">E-mail*</label>
                <input
                  id="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleFormChange}
                />

                <div className="cpf-phone-container">
                  <div className="cpf-phone-row">
                    <label>CPF</label>
                    <input
                      id="cpf"
                      name="cpf"
                      value={userForm.cpf}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="cpf-phone-row">
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

                <button>
                  <h3>Adicionar</h3>
                </button>
              </form>
            </div>
          </div>
        )}
        {successcCardOpen && <SuccessCard />}
      </div>
    </div>
  );
}
export default UserModal;
