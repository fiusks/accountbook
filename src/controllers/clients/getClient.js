const knex = require("../../database/connection");

const getClients = async (req, res) => {
  try {
    const { id } = req.params;

    const clientData = await knex("clients").where({ id }).first();
    const bills = await knex("bills")
      .select("id", "amount", "description", "bill_status", "due_date")
      .where("client_id", id)
      .orderBy("bills.id", "desc")
      .limit(4);

    for (const bill of bills) {
      if (bill.due_date < new Date() && bill.bill_status !== "paid") {
        bill.bill_status = "overdue";
      }
    }

    clientData.bills = bills;

    return res.status(200).json({ client: clientData });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = getClients;
