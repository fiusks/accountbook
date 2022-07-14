const knex = require("../../database/connection");
const { billsSchema } = require("../../validation/billsSchema");

const createBill = async (req, res) => {
  await billsSchema.validate(req.body.bill);
  try {
    const { clientId, amount, status, dueDate, desc } = req.body.bill;

    const response = await knex("bills")
      .insert({
        amount: amount,
        bill_status: status,
        client_id: clientId,
        description: desc,
        due_date: dueDate,
      })
      .returning("*");
    if (response === 0) {
      return res
        .status(400)
        .json({ message: "it was not possible to register a new billing" });
    }
    return res
      .status(201)
      .json({ bill: { message: "Cobrança cadastrada com sucesso" } });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = createBill;
