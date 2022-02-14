const Yup = require("./Yup");

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Inserir um e-mail válido")
    .required("O email é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

module.exports = loginSchema;
