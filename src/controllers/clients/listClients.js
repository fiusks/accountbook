const knex = require("../../database/connection");

const listClients = async (req, res) => {
  const { id } = req.user;

  const clients = await knex("clients")
    .select("id", "name", "cpf", "email", "phone")
    .orderBy("id", "desc")
    .limit(10);

  for (const client of clients) {
    const cobrancas = await knex("bills").where({
      client_id: client.id,
      bill_status: "pending",
    });
    const overdue = cobrancas.filter(
      (cobranca) => cobranca.due_date < new Date()
    );
    if (overdue.length !== 0) {
      client.status = "Inadimplente";
    } else {
      client.status = "Em dia";
    }
  }

  res.status(200).json(clients);
};

module.exports = listClients;
