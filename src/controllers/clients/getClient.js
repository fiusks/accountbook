const knex = require("../../database/connection");

const getClients = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await knex("clients").where({ id });

        return res.status(200).json(client);
    } catch (error) {
        return res.status(400).json("Falha ao detalhar o cliente.");
    }
};

module.exports = getClients;
