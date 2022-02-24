const knex = require("../../database/connection");

const deleteBill = async (req, res) => {
    const { id } = req.params;

    try {
        const cobranca = await knex("bills").where({ id }).first().del();

        return res.status(200).json("Cobrança deletada com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = deleteBill;
