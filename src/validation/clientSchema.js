const Yup = require("./Yup");

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
    .min(10, "Telefone inválido")
    .max(11, "Telefone inválido")
    .required("O telefone é obrigatório"),
  address: Yup.string().nullable(),
  complement: Yup.string().nullable(),
  zipcode: Yup.string(),
  district: Yup.string().nullable(),
  city: Yup.string().nullable(),
  state: Yup.string().nullable(),
});

module.exports = clientSchema;
