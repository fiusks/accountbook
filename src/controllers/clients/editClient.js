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
    const { cpf: cpfDB, email: emailDB } = await knex("clients")
      .select("cpf", "email")
      .where({ id })
      .first();

    const errors = {};

    if (!(emailDB === email)) {
      const emailExist = await knex("clients")
        .select("email")
        .where({ email })
        .first();

      if (emailExist) {
        errors.email = "E-mail já cadastrado";
      }
    }

    if (!(cpfDB === cpf)) {
      const cpfExist = await knex("clients")
        .select("cpf")
        .where({ cpf })
        .first();
      if (cpfExist) {
        errors.cpf = "CPF já cadastrado";
      }

      if (errors.cpf || errors.email) {
        return res.status(400).json({ client: errors });
      }
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
