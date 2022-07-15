import knex from "../../database/connection";

const listClientBills = async (req, res) => {
    try {
        const { clientId } = req.params;

        const clientBills = await knex("bills").where({ 
            client_id: clientId 
        });

        return res.status(200).json(clientBills);
    } catch (error) {
        return res.status(400).json("Falha ao detalhar o cliente.");
    }
};

module.exports = listClientBills;