import prisma from "../../database/client";

const getClients = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const { id } = req.params;

    const clientData = await prisma.client.findFirst({
      include: {
        transactions: true
      },
      where: {
        id: id
      }
    })

    if (clientData?.transactions) {
      const bills = clientData.transactions
      for (const bill of bills) {
        if (bill.due_date < today && bill.status !== "paid") {
          bill.status = "overdue";
        }

        bill.amount = BigInt(Number(bill.amount) / 100);
      }

    }

    return res.status(200).json({ client: clientData });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default getClients;
