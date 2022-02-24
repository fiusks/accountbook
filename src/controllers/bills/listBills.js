const knex = require("../../database/connection");

function checkLength(value) {
  return value < 10 ? `0${String(value)}` : String(value);
}
const listBills = async (req, res) => {
  try {
    const getPaidBills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select("clients.name", "bills.id", "bills.amount", 'bills.description', 'bills.bill_status', 'bills.due_date')
      .where({ bill_status: "paid" });
    const quantityPaidBills = getPaidBills.length;
    const totalAmountPaidSUM = await knex("bills")
      .sum("amount")
      .where("bill_status", "paid")
      .first();

    const getUnpaidBills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select("clients.name", "bills.id", "bills.amount", 'bills.description', 'bills.bill_status', 'bills.due_date')
      .where({ bill_status: "pending" })
      .andWhere("due_date", ">=", new Date());
    const quantityUnpaidBills = getUnpaidBills.length;
    const totalAmountUnpaidSUM = await knex("bills")
      .sum("amount")
      .where({ bill_status: "pending" })
      .andWhere("due_date", ">=", new Date())
      .first();
    const getOverdueBills = await knex("bills")
      .leftJoin("clients", "clients.id", "bills.client_id")
      .select("clients.name", "bills.id", "bills.amount", 'bills.description', 'bills.bill_status', 'bills.due_date')
      .where({ bill_status: "pending" })
      .andWhere("due_date", "<", new Date());
    getOverdueBills.forEach((bill) => {bill.bill_status = 'overdue'})
    const quantityOverdueBills = getOverdueBills.length;
    const totalAmountOverdueSUM = await knex("bills")
      .sum("amount")
      .where({ bill_status: "pending" })
      .andWhere("due_date", "<", new Date())
      .first();

    const { sum: totalAmountOverdue } = totalAmountOverdueSUM;
    const { sum: totalAmountUnpaid } = totalAmountUnpaidSUM;
    const { sum: totalAmountPaid } = totalAmountPaidSUM;

    // /\/\/\ bills

    // VVV Clients

    const clients = await knex("clients")
      .select("id", "name", "cpf", "email", "phone")
      .orderBy("id", "desc");

    for (const client of clients) {
      const cobrancas = await knex("bills").where({
        client_id: client.id,
        bill_status: "pending",
      });
      const overdue = cobrancas.filter(
        (cobranca) => cobranca.due_date < new Date()
      );
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
        overdueClients,
        quantityOverdueClients: `${checkLength(overdueClients.length)}`,
        ondueClients,
        quantityOndueClients: `${checkLength(ondueClients.length)}`,
        overdueBills: getOverdueBills,
        quantityOverdueBills: `${checkLength(quantityOverdueBills)}`,
        paidBills: getPaidBills,
        quantityPaidBills: `${checkLength(quantityPaidBills)}`,
        unpaidBills: getUnpaidBills,
        quantityUnpaidBills: `${checkLength(quantityUnpaidBills)}`,
        totalAmountPaid,
        totalAmountUnpaid,
        totalAmountOverdue,
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = listBills;
