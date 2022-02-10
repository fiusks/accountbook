export function handleInputErrors(fieldsInput, form, setError) {
  function handleErrorMsg(field, msg) {
    const newError = { [field]: msg };

    setError((previousState) => ({ ...previousState, ...newError }));
  }

  let nameTranslated = "";

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
      case "checkpassword":
        nameTranslated = "Senha";
        break;
      default:
        return;
    }

    const field = form[fieldInput];
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
        if (typeof form["email"] !== "undefined") {
          let lastAtPos = form["email"].lastIndexOf("@");
          let lastDotPos = form["email"].lastIndexOf(".");

          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              form["email"].indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              form["email"].length - lastDotPos > 2
            )
          ) {
            handleErrorMsg(fieldInput, "O fomato do email é inválido");
          }
        }
        break;

      case "cpf":
        if (!field) {
          break;
        }
        if (field.length !== 11) {
          handleErrorMsg(
            fieldInput,
            `O fomato do ${nameTranslated.toLocaleLowerCase()} é inválido`
          );
        }
        break;

      case "phone":
        if (!field) {
          break;
        }
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
      case "checkpassword":
        if (field !== form["password"]) {
          handleErrorMsg(fieldInput, "As senhas não coincidem");
        }
        break;
      default:
        return;
    }
  });
}
