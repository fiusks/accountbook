const knex = require("../../database/connection");

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
    const emailExist = await knex("clients").where({ email }).first();
    const cpfExist = await knex("clients").where({ cpf }).first();

    const errors = {};
    if (emailExist) {
      errors.email = "E-mail já cadastrado";
    }
    if (cpfExist) {
      errors.cpf = "CPF já cadastrado";
    }
    if (emailExist || cpfExist) {
      res.status(400).json({ client: errors });
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

    res.status(200).json({
      success: "Cliente Editado Com sucesso",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = editClient;
