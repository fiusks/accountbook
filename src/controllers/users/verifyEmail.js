const knex = require("../../database/connection");

const verifyEmail = async (req, res) => {
  const { email } = req.params;

  if (email) {
    const emailCheck = await knex("users").where({ email }).first();

    if (emailCheck) {
      res.status(400).json({ user: { email: "E-mail já cadastrado" } });
    } else {
      res.status(200).json({ success: "E-mail disponível" });
    }
  } else {
    res.status(404).json({ user: { email: "E-mail não informado" } });
  }
};

module.exports = verifyEmail;
