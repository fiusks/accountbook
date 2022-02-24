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

  function getFilteredList() {
    if (filteredSearch && filteredStatus) {
      const filteredList = filterTwoArrays(
        filteredSearch,
        filteredStatus
      ).filter((client, index) => index < 10);
      return filteredList;
    }
    if (filteredSearch) {
      const filteredList = filteredSearch.filter((client, index) => index < 10);
      return filteredList;
    }
    if (filteredStatus) {
      const filteredList = filteredStatus.filter((client, index) => index < 10);
      return filteredList;
    }
  }

  const filterdClientList = getFilteredList();
  const data =
    filterdClientList.length === 0
      ? "Nenhum resultado encontrado"
      : filterdClientList;

  return res.status(200).json({ client: data });
};

module.exports = listFilteredClients;
