import prisma from "../../database/client";
const { billsSchema } = require("../../validation/billsSchema");

const createBill = async (req, res) => {
  await billsSchema.validate(req.body.bill);
  try {
    const { client_id, amount, status, due_date, description } = req.body

    const response = await prisma.transaction.create({
      data: {
        amount, status, client_id, due_date, description
      }
    })

    if (!response) {
      return res
        .status(400)
        .json({ message: "it was not possible to register a new billing" });
    }
    return res
      .status(201)
      .json({ bill: { message: "Cobrança cadastrada com sucesso" } });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

export default createBill;
