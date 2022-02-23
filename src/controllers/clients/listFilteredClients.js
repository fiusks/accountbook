const knex = require("../../database/connection");

const listFilteredClients = async (req, res) => {
  const { clientSearch, clientStatus } = req.query;

  const clients = await knex("clients")
    .select("id", "name", "cpf", "email", "phone")
    .orderBy("id", "desc");

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

  if (clientStatus) {
    const filteredClients = clients.filter((client) => {
      if (client.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      if (client.email.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      if (client.cpf.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
    });
  }

  const filteredClients = filterClients(search);

  return res.status(200).json(filteredClients);
};

module.exports = listFilteredClients;
