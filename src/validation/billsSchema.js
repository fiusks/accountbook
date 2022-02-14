const Yup = require("./Yup");

const billsSchema = Yup.object().shape({
  name: Yup.string().required("Inserir um nome para a cobrança"),
  description: Yup.string().required("A cobrança deve ter uma descrição"),
  due_date: Yup.date().required("A data de vencimento é obrigatória"),
  amount: Yup.number().required("O valor é obrigatório"),
  bill_status: Yup.boolean().required(),
});

module.exports = billsSchema;
