import prisma from "../../database/client";
import { ITransaction } from "../../models/transactions"

const editBill = async (req, res) => {
  try {

    const { id, client_id, amount, status, due_date, type, description } = req.body as ITransaction

    const billExist = await prisma.transaction.findFirst({
      where: {
        client_id, id
      }
    })

    if (!billExist) {
      return res
        .status(404)
        .json({ bill: { message: "Cobrança não encontrada" } });
    }

    const response = await prisma.transaction.update({
      data: {
        amount: amount ? BigInt(amount) : undefined,
        status: status ? status : undefined,
        due_date: due_date ? due_date : undefined
      }, where: {
        id
      }
    })

    if (!response) {
      return res
        .status(400)
        .json({ message: "it was not possible to register a edited billing" });
    }

    return res
      .status(200)
      .json({ bill: { message: "Cobrança editada com sucesso" } });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default editBill;
