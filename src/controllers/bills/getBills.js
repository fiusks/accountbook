const knex = require('../../database/connection');

const getBills = async (req, res) => {
    const { pesquisa } = req.params
    try {
        if (!pesquisa) {

            const bills = await knex('bills')
                .leftJoin('clients', 'clients.id', 'bills.client_id')
                .select('clients.name', 'bills.id', 'bills.amount', 'bills.description', 'bills.bill_status', 'bills.due_date')
                .orderBy('bills.id', 'desc').limit(10);
    
            for (const bill of bills) {
                if (bill.due_date < new Date() && bill.bill_status !== 'paid') {
                    bill.bill_status = 'overdue'
                }
            }
    
            return res.status(200).json({
                bills
            });

        } else {
            console.log(pesquisa)
            res.status(200).json('tem params nessa zorra')
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

module.exports = getBills;