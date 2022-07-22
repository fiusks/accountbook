import prisma from "../../database/client";
import { IClients } from "../../models/clients";

const registerClient = async (req, res) => {
  const {
    name,
    email,
    cpf,
    phone,
    address,
    complement,
    zipcode,
    district,
    city,
    state,
  } = req.body;
  const clientData = req.body as IClients
  clientData.id = req.user

  try {
    const uniqueDataExist = await prisma.client.findFirst({
      where: {
        email,

        OR: {
          cpf
        }
      }
    })

    const errors: Record<string, string | string[]> = {};
    if (uniqueDataExist?.email) {
      errors.email = "E-mail já cadastrado";
    }
    if (uniqueDataExist?.cpf) {
      errors.cpf = "CPF já cadastrado";
    }
    if (errors.email || errors.cpf) {
      return res.status(400).json({ client: errors });
    }

    await prisma.client.create({
      data: clientData
    })

    return res.status(200).json({
      success: "Cliente Cadastrado Com sucesso",
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default registerClient;
