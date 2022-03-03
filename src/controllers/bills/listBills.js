const knex = require("../../database/connection");

function checkLength(value) {
  return value < 10 ? `0${String(value)}` : String(value);
}
const listBills = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const getPaidBills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select(
        "clients.name",
        "bills.id",
        "bills.amount",
        "bills.description",
        "bills.bill_status",
        "bills.due_date"
      )
      .where({ bill_status: "paid" });
      getPaidBills.forEach(bill => {
        bill.amount = bill.amount / 100;
      })
    const quantityPaidBills = getPaidBills.length;
    const totalAmountPaidSUM = await knex("bills")
      .sum("amount")
      .where("bill_status", "paid")
      .first();

    const getUnpaidBills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select(
        "clients.name",
        "bills.id",
        "bills.amount",
        "bills.description",
        "bills.bill_status",
        "bills.due_date"
      )
      .where({ bill_status: "pending" })
      .andWhere("due_date", ">=", today);

      getUnpaidBills.forEach(bill => {
        bill.amount = bill.amount / 100;
      })

    const quantityUnpaidBills = getUnpaidBills.length;
    const totalAmountUnpaidSUM = await knex("bills")
      .sum("amount")
      .where({ bill_status: "pending" })
      .andWhere("due_date", ">=", today)
      .first();
    const getOverdueBills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select(
        "clients.name",
        "bills.id",
        "bills.amount",
        "bills.description",
        "bills.bill_status",
        "bills.due_date"
      )
      .where({ bill_status: "pending" })
      .andWhere("due_date", "<", today);
    getOverdueBills.forEach((bill) => {
      bill.bill_status = "overdue";
      bill.amount = bill.amount / 100;
    });
    const quantityOverdueBills = getOverdueBills.length;
    const totalAmountOverdueSUM = await knex("bills")
      .sum("amount")
      .where({ bill_status: "pending" })
      .andWhere("due_date", "<", today)
      .first();

    const { sum: totalAmountOverdue } = totalAmountOverdueSUM;
    const { sum: totalAmountUnpaid } = totalAmountUnpaidSUM;
    const { sum: totalAmountPaid } = totalAmountPaidSUM;

    const clients = await knex("clients")
      .select("id", "name", "cpf", "email", "phone")
      .orderBy("id", "desc");

    for (const client of clients) {
      const cobrancas = await knex("bills").where({
        client_id: client.id,
        bill_status: "pending",
      });
      const overdue = cobrancas.filter((cobranca) => cobranca.due_date < today);
      if (overdue.length !== 0) {
        client.status = "Inadimplente";
      } else {
        client.status = "Em dia";
      }
    }
    ondueClients = clients.filter((client) => client.status === "Em dia");
    overdueClients = clients.filter(
      (client) => client.status === "Inadimplente"
    );

    return res.status(200).json({
      client: {
        overdueClients: overdueClients.slice(0, 4),
        quantityOverdueClients: `${checkLength(overdueClients.length)}`,
        ondueClients: ondueClients.slice(0, 4),
        quantityOndueClients: `${checkLength(ondueClients.length)}`,
        overdueBills: getOverdueBills.slice(0, 4),
        quantityOverdueBills: `${checkLength(quantityOverdueBills)}`,
        paidBills: getPaidBills.slice(0, 4),
        quantityPaidBills: `${checkLength(quantityPaidBills)}`,
        unpaidBills: getUnpaidBills.slice(0, 4),
        quantityUnpaidBills: `${checkLength(quantityUnpaidBills)}`,
        totalAmountPaid: totalAmountPaid / 100,
        totalAmountUnpaid: totalAmountUnpaid / 100,
        totalAmountOverdue: totalAmountOverdue / 100,
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = listBills;
