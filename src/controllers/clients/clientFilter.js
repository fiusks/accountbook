const { default: knex } = require("knex");

const clientNameFilter = async (req, res) => {
    const { clientName } = req.params;
    
    try {
        if (clientName) {
            const nameSearch = await knex('clients').whereILike('name', `%${clientName}%`).debug();
            res.status(200).json(nameSearch)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = clientNameFilter;