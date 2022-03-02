const Yup = require("./yup");

const clientSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("Inserir um e-mail válido")
    .required("O email é obrigatório"),
  cpf: Yup.string()
    .min(11, "O CPF deve conter 11 dígitos")
    .max(11, "O CPF deve conter 11 dígitos")
    .required("O CPF é obrigatório"),
  phone: Yup.string()
    .min(10, "Telefone deve ter no minímo 10 dígitos")
    .max(11, "Telefone deve ter no máximo 11 dígitos")
    .required("O telefone é obrigatório"),
  address: Yup.string().nullable(),
  complement: Yup.string().nullable(),
  zipcode: Yup.string(),
    // .min(8, "O CEP deve conter 08 dígitos")
    // .max(8, "O CEP deve conter 08 dígitos")
    // .nullable(),
  district: Yup.string().nullable(),
  city: Yup.string().nullable(),
  state: Yup.string().nullable(),
});

module.exports = clientSchema;
