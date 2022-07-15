import knex from "../../database/connection";

const searchBill = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const { params } = req.body.filterBill;

    const bills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select(
        "clients.name",
        "bills.client_id",
        "bills.id",
        "bills.amount",
        "bills.description",
        "bills.bill_status",
        "bills.due_date"
      )
      .orderBy("bills.id", "desc")
      .limit(10)
      .whereILike("clients.name", `%${params}%`)
      .orWhere("bills.id", isNaN(params) ? null : params);

    for (const bill of bills) {
      if (bill.due_date < today && bill.bill_status !== "paid") {
        bill.bill_status = "overdue";
      }

      bill.amount = (bill.amount / 100);
    }
    if (bills.length === 0) {
      return res.status(404).json({ message: "Bill not found" });
    }
    return res.status(200).json(bills);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = searchBill;
