import "./style.scss";
import closeIcon from "../../assets/images/closeicon.svg";
import SuccessCard from "../success-card";
import useUser from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { Input, PasswordInput } from "../input-generic";

function UserModal() {
  const { openModal, setOpenModal } = useUser();
  const [successcCardOpen, setSuccessCardOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    checkpassword: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(
        "https://api-teste-equipe-6.herokuapp.com/",
        {
          method: "GET",
          mode: "cors",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { nome, email } = data[0];
      const setNewForm = { name: nome, email };
      setUserForm(setNewForm);
    };

    getUserData();
  }, []);

  const errorMessage = "oi";

  function handleSubmit(event) {
    event.preventDefault();
    setSuccessCardOpen(true);
    setTimeout(() => {
      setOpenModal(false);
      setSuccessCardOpen(false);
    }, 2000);
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
                <Input
                  name="name"
                  required
                  errorMessage={errorMessage}
                  value={userForm.name}
                  dataUpdate={userForm}
                />
                <Input
                  name="email"
                  required
                  errorMessage={errorMessage}
                  value={userForm.email}
                  dataUpdate={userForm}
                />

                <div className="cpf-phone-container">
                  <div className="cpf-phone-row">
                    <Input
                      name="cpf"
                      required
                      errorMessage={errorMessage}
                      value={userForm.cpf}
                      dataUpdate={userForm}
                    />
                  </div>
                  <div className="cpf-phone-row">
                    <Input
                      name="phone"
                      required
                      errorMessage={errorMessage}
                      value={userForm.phone}
                      dataUpdate={userForm}
                    />
                  </div>
                </div>
                <div className="password-inputs">
                  <PasswordInput name="password" />
                  <PasswordInput name="passwordcheck" />
                </div>
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
