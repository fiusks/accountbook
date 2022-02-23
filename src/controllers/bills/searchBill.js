const knex = require("../../database/connection");
const { searchBillSchema } = require("../../validation/billsSchema");

const searchBill = async (req, res) => {
  await searchBillSchema.validate(req.body.bill);
  try {
    const { params, category } = req.body.bill;

    if (category === "searchById") {
      const bills = await knex("bills")
        .leftJoin("clients", "clients.id", "bills.client_id")
        .select(
          "clients.name",
          "bills.id",
          "bills.amount",
          "bills.description",
          "bills.bill_status",
          "bills.due_date"
        )
        .orderBy("bills.id", "desc")
        .limit(10)
        .where({ id: params });
      return res.status(404).json(bills);

      for (const bill of bills) {
        if (bill.due_date < new Date() && bill.bill_status !== "paid") {
          bill.bill_status = "overdue";
        }
      }

      if (bills.length === 0) {
        return res.status(404).json({ message: "Bill not found" });
      }
      return res.status(200).json(bills);
    } else {
      const clientID = await knex("clients").where({ name: params });

      if (clientID.length === 0) {
        return res.status(404).json({ message: "Client not found" });
      }
      const response = await knex("bills").where({ client_id: clientID[0].id });
      if (response.length === 0) {
        return res.status(404).json({ message: "Bill not found" });
      }
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = searchBill;
