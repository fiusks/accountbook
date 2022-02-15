const knex = require("../../database/connection");

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
  console.log(req.body);
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

    await knex("clients").insert(clientData);

    res.status(200).json({
      success: "Cliente Cadastrado Com sucesso",
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = registerClient;
