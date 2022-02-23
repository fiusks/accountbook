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

  const filteredStatus = clientStatus
    ? clients.filter((client) => client.status === clientStatus)
    : undefined;

  function filterSearch(search) {
    const filter = clients.filter((client) => {
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

    return filter;
  }
  const filteredSearch = clientSearch ? filterSearch(clientSearch) : undefined;

  function filterTwoArrays(array1, array2) {
    return array1.filter((client) => array2.indexOf(client) !== -1);
  }

  const client = {};

  if (filteredSearch && filteredStatus) {
    client.filters = filterTwoArrays(filteredSearch, filteredStatus).filter(
      (client, index) => index < 10
    );
  } else if (filteredSearch) {
    client.filters = filteredSearch.filter((client, index) => index < 10);
  } else if (filteredStatus) {
    client.filters = filteredStatus.filter((client, index) => index < 10);
  } else {
    client.filters = "Nenhum resultado encontrado";
  }

  return res.status(200).json({ client });
};

module.exports = listFilteredClients;
