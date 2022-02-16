const knex = require("../../database/connection");

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

        const getOverdueClients = await knex('bills')
        .leftJoin('clients', 'clients.id', 'bills.client_id')
        .select('bills.amount', 'bills.id', 'clients.name', 'bills.due_date')
        .where({bill_status: 'pending'})
        .andWhere('due_date', '<', new Date())
        .groupBy('bills.amount', 'bills.id', 'clients.name');
        const quantityOverdueClients = getOverdueClients.length;

        const getOndueClients = await knex('bills')
        .innerJoin('clients', 'clients.id', 'bills.client_id')
        .select('bills.amount', 'bills.id', 'clients.name', 'bills.due_date')
        .where({bill_status: 'pending'})
        .andWhere('due_date', '>', new Date())
        .groupBy('bills.amount', 'bills.id', 'clients.name').groupBy('clients.name').debug();
        const quantityOndueClients = getOndueClients.length;
        console.log(getOndueClients)
        res.status(200).json({ client: {
            overdueClients:getOverdueClients,
            quantityPaidBills:quantityPaidBills < 10? `0${String(quantityPaidBills)}`: String(quantityPaidBills),
            ondueClients:getOndueClients,
            quantityUnpaidBills:quantityUnpaidBills < 10?`0${String(quantityUnpaidBills)}`: String(quantityUnpaidBills),
            overdueBills: getOverdueBills,
            quantityOverdueBills:quantityOverdueBills < 10?`0${String(quantityOverdueBills)}`: String(quantityOverdueBills),
            paidBills: getPaidBills,
            quantityOverdueClients:quantityOverdueClients < 10?`0${String(quantityOverdueClients)}`: String(quantityOverdueClients),
            unpaidBills: getUnpaidBills,
            quantityOndueClients:quantityOndueClients < 10?`0${String(quantityOndueClients)}`: String(quantityOndueClients)
        }});
     
      
    } catch (error) {
      res.status(400).json(error.message);
    }
};

module.exports = listBills;
