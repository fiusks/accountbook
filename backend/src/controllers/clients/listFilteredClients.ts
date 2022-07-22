import prisma from "../../database/client";
import { IClients } from "../../models/clients";

const listFilteredClients = async (req, res) => {
  const { search, status } = req.body.client;

  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
      cpf: true,
      email: true,
      phone: true
    },
    orderBy: {
      id: "desc"
    }
  })

  const clientListWithStatus: IClients[] = clients

  for (const client of clientListWithStatus) {
    const cobrancas = await prisma.transaction.findMany({
      where: {
        client_id: client.id,
        status: "pending"
      }
    })
    const overdue = cobrancas.filter(
      (cobranca) => cobranca.due_date < new Date()
    );
    if (overdue.length !== 0) {
      client.status = "Inadimplente";
    } else {
      client.status = "Em dia";
    }
  }

  const filteredStatus = status
    ? clientListWithStatus.filter((client) => client.status === status)
    : undefined;

  function filterSearch(search) {
    const filter = clientListWithStatus.filter((client) => {
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
  const filteredSearch = search ? filterSearch(search) : undefined;

  function filterTwoArrays(array1, array2) {
    return array1.filter((client) => array2.indexOf(client) !== -1);
  }

  function getFilteredList() {
    if (filteredSearch && filteredStatus) {
      const filteredList = filterTwoArrays(
        filteredSearch,
        filteredStatus
      ).slice(0, 10);
      return filteredList;
    }
    if (filteredSearch) {
      const filteredList = filteredSearch.slice(0, 10);
      return filteredList;
    }
    if (filteredStatus) {
      const filteredList = filteredStatus;
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

export default listFilteredClients;
