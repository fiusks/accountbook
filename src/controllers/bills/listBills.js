const knex = require("../../database/connection");

function checkLength(array) {
    return array.length < 10? `0${String(array.length)}`: String(array.length)
}
const listBills = async (req, res) => {

    try {
        const getPaidBills = await knex('bills')
        .leftJoin('clients', 'clients.id', 'bills.client_id')
        .select('clients.name', 'bills.id', 'bills.amount')
        .where({bill_status: 'paid'});
        const quantityPaidBills = getPaidBills.length;

        const getUnpaidBills = await knex('bills')
        .leftJoin('clients', 'clients.id', 'bills.client_id')
        .select('clients.name', 'bills.id', 'bills.amount')
        .where({bill_status: 'pending'})
        .andWhere('due_date', '>', new Date());
        const quantityUnpaidBills = getUnpaidBills.length;

        const getOverdueBills = await knex('bills')
        .leftJoin('clients', 'clients.id', 'bills.client_id')
        .select('clients.name','bills.client_id', 'bills.id', 'bills.amount', 'bills.due_date')
        .where({bill_status: 'pending'})
        .andWhere('due_date', '<', new Date());
        const quantityOverdueBills = getOverdueBills.length;
        
        // /\/\/\ bills

        // VVV Clients

        const clients = await knex("clients")
        .select("id", "name", "cpf")
        .orderBy("id", "desc")

        for (const client of clients) {
            const cobrancas = await knex("bills")
                .where({client_id: client.id, bill_status: "pending"});
            const overdue = cobrancas.filter(
              (cobranca) => cobranca.due_date < new Date()
            );
            if (overdue.length !== 0) {
              client.status = "Inadimplente";
            } else {
              client.status = "Em dia";
            }
        }
        ondueClients = clients.filter(client => client.status === "Em dia");
        overdueClients = clients.filter(client => client.status === "Inadimplente");

         res.status(200).json({ client: {
            overdueClients,
            quantityOverdueClients:checkLength(overdueClients),
            ondueClients,
            quantityOndueClients:checkLength(ondueClients),
            overdueBills: getOverdueBills,
            quantityOverdueBills:checkLength(quantityOverdueBills),
            paidBills: getPaidBills,
            quantityPaidBills:checkLength(quantityPaidBills),
            unpaidBills: getUnpaidBills,
            quantityUnpaidBills:checkLength(quantityUnpaidBills),
        }});
     
      
    } catch (error) {
      res.status(400).json(error.message);
    }
};

module.exports = listBills;


