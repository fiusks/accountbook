const knex = require("../../database/connection");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
  const { id, name, email, password, cpf, phone } = req.body.user;

  const newUserData = {};
  const errors = {};

  try {
    const userDB = await knex("users").where({ id }).first();
    const {
      name: nameDB,
      email: emailDB,
      cpf: cpfDB,
      phone: phoneDB,
      password: passwordDB,
    } = userDB;

    const emailExist = await knex("users")
      .where({ email })
      .whereNot({ id })
      .first();

    const cpfExist = await knex("users")
      .where({ cpf })
      .whereNot({ id })
      .first();

    if (password) {
      const checkPassword = await bcrypt.compare(password, passwordDB);
      if (checkPassword) {
        errors.password = "A senha deve ser diferente da anterior";
      } else {
        const newPasswordEncrypted = await bcrypt.hash(password, 10);
        newUserData.password = newPasswordEncrypted;
      }
    }

    if (emailExist) {
      errors.email = "E-mail já cadastrado";
    }
    if (cpfExist) {
      errors.cpf = "CPF já cadastrado";
    }
    if (errors.cpf || errors.email || errors.password) {
      return res.status(400).json({ user: { error: errors } });
    }

    if (emailDB !== email) {
      newUserData.email = email;
    }

    if (cpfDB !== cpf && cpf !== undefined) {
      newUserData.cpf = cpf;
    }

    if (phoneDB !== phone && phone !== undefined) {
      newUserData.phone = phone;
    }
    if (nameDB !== name) {
      newUserData.name = name;
    }
    const { password: oldPassword, ...userData } = userDB;
    const newUserDB = { ...userData, ...newUserData };

    if (Object.keys(newUserData)[0]) {
      await knex("users").where({ id }).update(newUserData);
    }

    return res.status(200).json({ user: newUserDB });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = editUser;
