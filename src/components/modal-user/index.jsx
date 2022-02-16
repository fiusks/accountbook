import "./style.scss";
import closeIcon from "../../assets/images/closeicon.svg";
import SuccessCard from "../success-card";
import useUser from "../../hooks/useUser";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Input, PasswordInput } from "../input-generic";
import { handleInputErrors } from "../../services/inputErrorHandler";

function UserModal() {
  const {
    openModal,
    setOpenModal,
    setFormSubmitted,
    userForm,
    setUserForm,
    setPasswordState,
  } = useUser();

  const { userData, token, setUserData } = useAuth();
  const [successcCardOpen, setSuccessCardOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    checkpassword: "",
  });

  useEffect(() => {
    function handleFormChange() {
      setErrorMessage({});

      const fieldsInput = [
        "name",
        "email",
        "cpf",
        "phone",
        "password",
        "checkpassword",
      ];

      handleInputErrors(fieldsInput, userForm, setErrorMessage);
    }

    handleFormChange();
  }, [userForm]);

  useEffect(() => {
    // setUserForm((previousState) => ({ ...previousState, ...newForm }));
    const setNewForm = {
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      phone: userData.phone,
      password: "",
      checkpassword: "",
    };

    setUserForm(setNewForm);
  }, [userData]);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!Object.keys(errorMessage).length) {
      editUser();
    }
    setFormSubmitted(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
    setFormSubmitted(false);
    setErrorMessage({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      password: "",
      checkpassword: "",
    });
    setPasswordState(false);
    const cleanPassword = { password: "", checkpassword: "" };
    setUserForm((previousState) => ({ ...previousState, ...cleanPassword }));
  }

  async function editUser() {
    const newUserData = {
      nome: userForm.name,
      email: userForm.email,
      cpf: userForm.cpf,
      telefone: userForm.phone,
      novaSenha: userForm.password,
    };

    try {
      const response = await fetch(
        "https://api-debug-is-on-the-table.herokuapp.com/editUser",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUserData),
        }
      );

      const data = await response.json();

      if (!data.sucess) {
        if (data.email) {
          const erro = { email: data.email[0] };
          setErrorMessage((previousState) => ({ ...previousState, ...erro }));
          if (data.cpf) {
            const erro = { cpf: data.cpf };
            setErrorMessage((previousState) => ({ ...previousState, ...erro }));
          }
        }
        return;
      }
      setUserData((prevState) => ({ ...prevState, ...userForm }));
      setSuccessCardOpen(true);
      setTimeout(() => {
        setOpenModal(false);
        setSuccessCardOpen(false);
      }, 2000);
    } catch (error) {}
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
                onClick={handleCloseModal}
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <Input
                  name="name"
                  value={userForm.name}
                  errorMessage={errorMessage}
                  dataUpdate={userForm}
                  required
                />
                <Input
                  name="email"
                  value={userForm.email}
                  dataUpdate={userForm}
                  errorMessage={errorMessage}
                  required
                />

                <div className="cpf-phone-container">
                  <div className="cpf-phone-row">
                    <Input
                      name="cpf"
                      value={userForm.cpf}
                      dataUpdate={userForm}
                      errorMessage={errorMessage}
                    />
                  </div>
                  <div className="cpf-phone-row">
                    <Input
                      name="phone"
                      value={userForm.phone}
                      dataUpdate={userForm}
                      errorMessage={errorMessage}
                    />
                  </div>
                </div>
                <div className="password-inputs">
                  <PasswordInput
                    name="password"
                    value={userForm.password}
                    dataUpdate={userForm}
                    errorMessage=""
                  />
                  <PasswordInput
                    name="checkpassword"
                    value={userForm.checkpassword}
                    dataUpdate={userForm}
                    errorMessage={errorMessage}
                  />
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
