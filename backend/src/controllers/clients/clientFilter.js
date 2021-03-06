const knex = require("../../database/connection");

const clientNameFilter = async (req, res) => {
    const { pesquisa } = req.query;
    
    try {
        if (pesquisa) {
            const nameSearch = await knex('clients').whereILike('name', `%${pesquisa}%`).debug();
            res.status(200).json(nameSearch)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = clientNameFilter;