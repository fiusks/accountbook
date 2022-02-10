import "./style.scss";
import { Input } from "../input-generic";
import clientIcon from "../../assets/images/clientsIcon.svg";
import closeIcon from "../../assets/images/closeicon.svg";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import SuccessCard from "../success-card";
import useAuth from "../../hooks/useAuth";

function ClientEditForm() {
  const { token } = useAuth();
  const { setOpenClientModal, setClientForm, clientForm, setFormSubmitted } =
    useUser();
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

  let nameTranslated = "";




 async function  registerClient() {

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
      UF: clientForm.state

    }
         
    try {
      const response = await fetch('https://api-debug-is-on-the-table.herokuapp.com/registerClient', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newClientData)
      })

      const data = await response.json();
      
      if(data.Message !== "Cliente Cadastrado Com sucesso"){
        return;
      }


      setSuccessCardOpen(true);
      setTimeout(() => {
        setOpenClientModal(false);
        setSuccessCardOpen(false);
      }, 2000)

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
      setFormSubmitted(true);
     

    } catch (error) {

    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const isEmpty = !Object.values(clientForm).some(
      (formItem) => formItem !== null && formItem !== ""
    );
    if (isEmpty) {
      handleFormChange()
      return;
    }
    registerClient();
    
  }

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

    fieldsInput.forEach((fieldInput) => {
      switch (fieldInput) {
        case "name":
          nameTranslated = "Nome";
          break;
        case "email":
          nameTranslated = "E-mail";
          break;
        case "cpf":
          nameTranslated = "CPF";
          break;
        case "phone":
          nameTranslated = "Telefone";
          break;
        case "address":
          nameTranslated = "Endereço";
          break;
        case "complement":
          nameTranslated = "Complemento";
          break;
        case "zipcode":
          nameTranslated = "CEP";
          break;
        case "district":
          nameTranslated = "Bairro";
          break;
        case "city":
          nameTranslated = "Cidade";
          break;
        case "state":
          nameTranslated = "UF";
          break;
        case "password":
          nameTranslated = "Senha";
          break;
        case "search":
          nameTranslated = "Pesquisa";
          break;
        default:
          return;
      }

      const field = clientForm[fieldInput];
      const requiredFields = ["name", "email", "cpf", "phone"];
      if (requiredFields.includes(fieldInput)) {
        if (!field) {
          handleErrorMsg(
            fieldInput,
            `O campo ${nameTranslated.toLocaleLowerCase()} é obrigatório`
          );
        }
      }

      switch (fieldInput) {
        case "email":
          if (typeof clientForm["email"] !== "undefined") {
            let lastAtPos = clientForm["email"].lastIndexOf("@");
            let lastDotPos = clientForm["email"].lastIndexOf(".");

            if (
              !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                clientForm["email"].indexOf("@@") === -1 &&
                lastDotPos > 2 &&
                clientForm["email"].length - lastDotPos > 2
              )
            ) {
              handleErrorMsg(fieldInput, "O fomato do email é inválido");
            }
          }
          break;

        case "cpf":
          if (field.length !== 11) {
            handleErrorMsg(
              fieldInput,
              `O fomato do ${nameTranslated.toLocaleLowerCase()} é inválido`
            );
          }
          break;

        case "phone":
          if (field.match(/^[0-9]+$/) == null) {
            handleErrorMsg(
              fieldInput,
              `O formato do ${nameTranslated.toLocaleLowerCase()} é inválido`
            );
          }
          if (field.length > 11) {
            handleErrorMsg(
              fieldInput,
              `O formato do ${nameTranslated.toLocaleLowerCase()} é inválido`
            );
          }
          break;

        case "zipcode":
          if (field.match(/^[0-9]+$/) == null) {
            handleErrorMsg(
              fieldInput,
              `O ${nameTranslated} deve conter apenas números`
            );
          }
          if (field.length !== 8) {
            handleErrorMsg(
              fieldInput,
              `O fomato do ${nameTranslated} é inválido`
            );
          }
          break;
        default:
          return;
      }
      

      function handleErrorMsg(field, msg) {
        const newError = { [field]: msg };

        setErrorMessage((previousState) => ({ ...previousState, ...newError }));
      }
    });

  }

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
      {!successcCardOpen && <div className="client-modal-container">
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
          <form onChange={handleFormChange}>
            <Input
              name="name"
              errorMessage={errorMessage}
              required
              value={clientForm["name"]}
              dataUpdate={clientForm}
            />
            <Input
              name="email"
              errorMessage={errorMessage}
              required
              dataUpdate={clientForm}
            />
            <div className="pair-even-fields">
              <Input
                name="cpf"
                errorMessage={errorMessage}
                required
                dataUpdate={clientForm}
              />
              <Input
                name="phone"
                errorMessage={errorMessage}
                required
                dataUpdate={clientForm}
              />
            </div>
            <Input
              name="address"
              errorMessage={errorMessage}
              dataUpdate={clientForm}
            />
            <Input
              name="complement"
              errorMessage={errorMessage}
              dataUpdate={clientForm}
            />
            <div className="pair-even-fields">
              <Input
                name="zipcode"
                errorMessage={errorMessage}
                dataUpdate={clientForm}
              />
              <Input
                name="district"
                errorMessage={errorMessage}
                dataUpdate={clientForm}
              />
            </div>
            <div className="pair-uneven-fields">
              <div className="input-field-big">
                <Input
                  className="testando"
                  name="city"
                  errorMessage={errorMessage}
                  dataUpdate={clientForm}
                />
              </div>
              <div className="growth-field-small">
                <Input
                  name="state"
                  errorMessage={errorMessage}
                  dataUpdate={clientForm}
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
      </div>}
    </div>
  );
}

export default ClientEditForm;
