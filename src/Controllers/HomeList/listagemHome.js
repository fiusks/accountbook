const knex = require('../../connection');

const listingHome = async(req, res) => {
    
    try {
        const getCobrancasFromDataBase = await knex('cobrancas');
        const getClientesFromDataBase = await knex('clientes');
        
        res.status(200).json({
            cobrancas: getCobrancasFromDataBase,
            clientes: getClientesFromDataBase
        });
        
        
    } catch (error) {
        res.status(400).json(error.message)
    }
    
};

module.exports = listingHome;