const knex = require("../../database/connection");

const listBills = async (req, res) => {};

// try {
//   const getPaiddBills = await knex("bills");
//   const getUnpaidBills = await knex("bills");
//   const getOverdueBills = await knex("bill");
//   const getOverdueClients = await knex("bills");
//   const getInDayClients = await knex("bills");

//   res.status(200).json({
//     cobrancas: getCobrancasFromDataBase,
//     clientes: getClientesFromDataBase,
//   });
// } catch (error) {
//   res.status(400).json(error.message);
// }

module.exports = listBills;
