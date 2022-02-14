const knex = require("../../database/connection");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
  const { id, name, email, password, cpf, phone } = req.body.user;

  const newUserData = {};

  try {
    const {
      name: nameDB,
      email: emailDB,
      cpf: cpfDB,
      phone: phoneDB,
      password: passwordDB,
    } = await knex("users").where({ id }).first();

    if (!(emailDB === email)) {
      const emailExist = await knex("users")
        .select("email")
        .where({ email })
        .first();
      console.log(!emailExist);
      if (emailExist) {
        return res
          .status(404)
          .json({ user: { email: "E-mail já cadastrado" } });
      }
      newUserData.email = email;
    }

    if (!(cpfDB === cpf) && cpf !== undefined) {
      const cpfExist = await knex("users").select("cpf").where({ cpf }).first();
      if (cpfExist) {
        return res.status(404).json({ user: { cpf: "CPF já cadastrado" } });
      }
      newUserData.cpf = cpf;
    }

    if (!(phoneDB === phone) && phone !== undefined) {
      newUserData.phone = phone;
    }
    if (!(nameDB === name)) {
      newUserData.name = name;
    }

    if (password) {
      const checkPassword = await bcrypt.compare(password, passwordDB);
      if (checkPassword) {
        return res.status(404).json({
          user: { password: "A senha deve ser diferente da anterior" },
        });
      }

      const newPasswordEncrypted = await bcrypt.hash(password, 10);
      newUserData.password = newPasswordEncrypted;
    }

    if (!Object.keys(newUserData)[0]) {
      return res
        .status(200)
        .json({ user: { success: "Usuário sem alterações" } });
    }

    await knex("users").where({ id }).update(newUserData);
    return res
      .status(200)
      .json({ user: { success: "Usuário editado com sucesso" } });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = editUser;
