import knex from "../../database/connection";

const editBill = async (req, res) => {
  try {
    const { id, clientId, amount, status, dueDate, desc } = req.body.bill;

    const billExist = await knex("bills")
      .where({
        id: id,
        client_id: clientId,
      })
      .first();

    if (!billExist) {
      return res
        .status(404)
        .json({ bill: { message: "Cobrança não encontrada" } });
    }

    const response = await knex("bills")
      .where({ id })
      .update({
        amount,
        bill_status: status,
        client_id: clientId,
        description: desc,
        due_date: dueDate,
      })
      .returning("*");
    if (response.length === 0) {
      return res
        .status(400)
        .json({ message: "it was not possible to register a edited billing" });
    }

    return res
      .status(200)
      .json({ bill: { message: "Cobrança editada com sucesso" } });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = editBill;
