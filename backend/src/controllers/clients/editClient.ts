import prisma from "../../database/client";
import { IClients } from "../../models/clients";

const editClient = async (req, res) => {
  const { id } = req.params;
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
  } = req.body.client;

  try {
    const errors: Record<string, string | string[]> = {};

    const emailExist = await prisma.client.findFirst({
      where: {
        email
      }
    })

    if (emailExist) {
      errors.email = "E-mail já cadastrado";
    }

    const cpfExist = await prisma.client.findFirst({
      where: {
        cpf
      }
    })

    if (cpfExist) {
      errors.cpf = "CPF já cadastrado";
    }

    if (emailExist || cpfExist) {
      return res.status(400).json({ client: errors });
    }

    const clientData = {
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
    } as IClients

    prisma.client.update({
      data: clientData,
      where: {
        id
      }
    })

    return res.status(200).json({
      success: "Cliente Editado Com sucesso",
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default editClient;
