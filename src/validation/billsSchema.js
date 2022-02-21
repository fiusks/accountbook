const Yup = require("./yup");

const billsSchema = Yup.object().shape({
  clientId: Yup.number().required("Deve haver um id do cliente"),
  desc: Yup.string().required("A cobrança deve ter uma descrição"),
  dueDate: Yup.date().required("A data de vencimento é obrigatória"),
  amount: Yup.number().required("O valor é obrigatório"),
  status: Yup.string().required("Deve haver um status para a cobrança"),
});

module.exports = billsSchema;
