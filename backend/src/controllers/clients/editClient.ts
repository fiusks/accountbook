import knex from "../../database/connection";

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

    const emailExist = await knex("clients")
      .select("email")
      .where({ email })
      .whereNot({ id })
      .first();

    if (emailExist) {
      errors.email = "E-mail já cadastrado";
    }

    const cpfExist = await knex("clients")
      .select("cpf")
      .where({ cpf })
      .whereNot({ id })
      .first();

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
    };

    await knex("clients").update(clientData).where({ id });

    return res.status(200).json({
      success: "Cliente Editado Com sucesso",
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = editClient;
