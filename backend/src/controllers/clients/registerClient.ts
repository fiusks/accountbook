import knex from "../../database/connection";

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
  } = req.body.client;
  const { id } = req.user;

  try {
    const emailExist = await knex("clients").where({ email }).first();
    const cpfExist = await knex("clients").where({ cpf }).first();

    const errors: Record<string, string | string[]> = {};
    if (emailExist) {
      errors.email = "E-mail já cadastrado";
    }
    if (cpfExist) {
      errors.cpf = "CPF já cadastrado";
    }
    if (emailExist || cpfExist) {
      return res.status(400).json({ client: errors });
    }
    const clientData = {
      user_id: id,
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

    await knex("clients").insert(clientData);

    return res.status(200).json({
      success: "Cliente Cadastrado Com sucesso",
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = registerClient;
