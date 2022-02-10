import "./style.scss";
import { Input } from "../input-generic";
import clientIcon from "../../assets/images/clientsIcon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";
import { useState, useEffect } from "react";
import { handleInputErrors } from "../../services/inputErrorHandler";
import SuccessCard from "../success-card";
import useAuth from "../../hooks/useAuth";

function ClientEditForm() {
  const { token } = useAuth();
  const {
    setOpenClientModal,
    setClientForm,
    clientForm,
    setFormSubmitted,
    setToast,
    formSubmitted,
  } = useUser();
  const [successcCardOpen, setSuccessCardOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    complement: "",
    zipcode: "",
    district: "",
    city: "",
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!Object.keys(errorMessage).length) {
      setFormSubmitted(true);
      async function registerClient() {
        const newClientData = {
          nome: clientForm.name,
          email: clientForm.email,
          cpf: clientForm.cpf,
          telefone: clientForm.phone,
          endereco: clientForm.address,
          complemento: clientForm.complement,
          cep: clientForm.zipcode,
          bairro: clientForm.district,
          cidade: clientForm.city,
          UF: clientForm.state,
        };

        try {
          const response = await fetch(
            "https://api-debug-is-on-the-table.herokuapp.com/registerClient",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newClientData),
            }
          );
          const data = await response.json();

          if (data.sucess !== "Cliente Cadastrado Com sucesso") {
            if (data.email) {
              const erro = { email: data.email };
              setErrorMessage((prevState) => ({ ...prevState, ...erro }));
            }
            if (data.cpf) {
              const erro = { cpf: data.cpf };
              setErrorMessage((prevState) => ({ ...prevState, ...erro }));
            }
            return;
          }
          setTimeout(() => {
            setClientForm({
              name: "",
              email: "",
              cpf: "",
              phone: "",
              address: "",
              complement: "",
              zipcode: "",
              district: "",
              city: "",
            });
            setOpenClientModal(false);
            setFormSubmitted(false);
            setTimeout(() => {
              setToast(true);
              setTimeout(() => {
                setToast(false);
              }, 4000);
            }, 1000);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
      registerClient();
    }
    setFormSubmitted(true);
  }

  useEffect(() => {
    async function getCEP() {
      const response = await fetch(
        `https://viacep.com.br/ws/${clientForm.zipcode}/json/`
      );
      const data = await response.json();
      const { bairro, complemento, localidade, logradouro, uf } = data;
      if (data.erro) {
        const zipcodeError = { zipcode: "CEP inválido" };
        setErrorMessage((prevState) => ({ ...prevState, ...zipcodeError }));

        return;
      }
      const fullAddress = {
        state: uf,
        district: bairro,
        address: logradouro,
        city: localidade,
        complement: complemento,
      };
      setClientForm((prevState) => ({ ...prevState, ...fullAddress }));
    }
    if (errorMessage["zipcode"] && clientForm["zipcode"].length === 8) {
      getCEP();
    }
  }, [clientForm["zipcode"]]);

  useEffect(() => {
    function handleFormChange() {
      setErrorMessage({});

      const fieldsInput = [
        "name",
        "email",
        "cpf",
        "phone",
        "address",
        "complement",
        "zipcode",
        "district",
        "city",
      ];

      handleInputErrors(fieldsInput, clientForm, setErrorMessage);
    }
    handleFormChange();
  }, [clientForm]);

  function handleCancelSubmit(event) {
    event.preventDefault();
    setOpenClientModal(false);
    setFormSubmitted(false);
    setClientForm({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      address: "",
      complement: "",
      zipcode: "",
      district: "",
      city: "",
    });
  }

  return (
    <div className="modal-client-background">
      {successcCardOpen && <SuccessCard />}
      {!successcCardOpen && (
        <div className="client-modal-container">
          <header>
            <img src={clientIcon} alt="client icon" />
            <h1>Cadastro do Cliente</h1>
            <img
              className="close-icon-btn"
              src={closeIcon}
              alt="close button icon"
              onClick={handleCancelSubmit}
            />
          </header>
          <div className="client-card-body">
            <form>
              <Input
                name="name"
                value={clientForm["name"]}
                dataUpdate={clientForm}
                errorMessage={errorMessage}
                required
              />
              <Input
                name="email"
                value={clientForm["email"]}
                dataUpdate={clientForm}
                errorMessage={errorMessage}
                required
              />
              <div className="pair-even-fields">
                <Input
                  name="cpf"
                  value={clientForm["cpf"]}
                  dataUpdate={clientForm}
                  errorMessage={errorMessage}
                  required
                />
                <Input
                  name="phone"
                  value={clientForm["phone"]}
                  dataUpdate={clientForm}
                  errorMessage={errorMessage}
                  required
                />
              </div>
              <Input
                name="address"
                value={clientForm["address"]}
                dataUpdate={clientForm}
                errorMessage={errorMessage}
              />
              <Input
                name="complement"
                value={clientForm["complement"]}
                dataUpdate={clientForm}
                errorMessage={errorMessage}
              />
              <div className="pair-even-fields">
                <Input
                  name="zipcode"
                  value={clientForm["zipcode"]}
                  dataUpdate={clientForm}
                  errorMessage={errorMessage}
                />
                <Input
                  name="district"
                  value={clientForm["district"]}
                  dataUpdate={clientForm}
                  errorMessage={errorMessage}
                />
              </div>
              <div className="pair-uneven-fields">
                <div className="input-field-big">
                  <Input
                    name="city"
                    value={clientForm["city"]}
                    dataUpdate={clientForm}
                    errorMessage={errorMessage}
                  />
                </div>
                <div className="growth-field-small">
                  <Input
                    name="state"
                    value={clientForm["state"]}
                    dataUpdate={clientForm}
                    errorMessage={errorMessage}
                  />
                </div>
              </div>
              <div className="client-modal-footer">
                <button className="cancel" onClick={handleCancelSubmit}>
                  Cancelar
                </button>
                <button onClick={handleFormSubmit} className="add">
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientEditForm;
