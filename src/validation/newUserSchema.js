const Yup = require("./Yup");

const newUserSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("Inserir um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string(),
});

module.exports = newUserSchema;
