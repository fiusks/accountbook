import prisma from "../../database/client";
import { IClients } from "../../models/clients";

const listClients = async (req, res) => {
  const { id } = req.user;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const clientsList = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
      cpf: true,
      email: true,
      phone: true
    },
    where: {
      user_id: id
    }, orderBy: {
      id: "desc"
    }, take: 10
  })

  const clientListWithStatus: IClients[] = clientsList

  for (const client of clientListWithStatus) {
    const cobrancas = await prisma.transaction.findMany({
      where: {
        client_id: client.id,
        status: "pending"
      }
    })

    const overdue = cobrancas.filter((cobranca) => cobranca.due_date < today);
    if (overdue.length !== 0) {
      client.status = "Inadimplente";
    } else {
      client.status = "Em dia";
    }
  }

  return res.status(200).json({ client: clientsList });
};

export default listClients;
