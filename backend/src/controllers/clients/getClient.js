const knex = require("../../database/connection");

const getClients = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const { id } = req.params;

    const clientData = await knex("clients").where({ id }).first();
    const bills = await knex("bills")
      .select("id", "amount", "description", "bill_status", "due_date")
      .where("client_id", id)
      .orderBy("bills.id", "desc")
      .limit(4);

    for (const bill of bills) {
      if (bill.due_date < today && bill.bill_status !== "paid") {
        bill.bill_status = "overdue";
      }

      bill.amount = (bill.amount / 100);
    }

    clientData.bills = bills;

    return res.status(200).json({ client: clientData });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = getClients;
