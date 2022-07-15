import knex from "../../database/connection";

const listClients = async (req, res) => {
  const { id } = req.user;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const clientsList = await knex("clients")
    .select("id", "name", "cpf", "email", "phone")
    .orderBy("id", "desc")
    .limit(10);

  for (const client of clientsList) {
    const cobrancas = await knex("bills").where({
      client_id: client.id,
      bill_status: "pending",
    });
    const overdue = cobrancas.filter((cobranca) => cobranca.due_date < today);
    if (overdue.length !== 0) {
      client.status = "Inadimplente";
    } else {
      client.status = "Em dia";
    }
  }

  return res.status(200).json({ client: clientsList });
};

module.exports = listClients;
