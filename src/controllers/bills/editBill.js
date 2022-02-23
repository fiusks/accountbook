const knex = require("../../database/connection");
const billsSchema = require("../../validation/billsSchema");

const editBill = async (req, res) => {
  try {
    await billsSchema.validate(req.body.bill);
    const { id, clientId, amount, status, dueDate, desc } = req.body.bill;

    const hasBill = await knex("bills").where({
      client_id: clientId,
    });
    return res.status(200).json(hasBill);
    const response = await knex("bills")
      .where({ id })
      .update({
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
        .json({ message: "it was not possible to register a edited billing" });
    }
    console.log(response);
    return res.status(200).json({ message: "sucess" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = editBill;
