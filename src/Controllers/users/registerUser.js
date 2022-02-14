const knex = require("../../database/connection");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email: verifyEmail } = req.query;

  try {
    if (verifyEmail) {
      const emailExist = await knex("users").where("email", verifyEmail);

      if (emailExist === []) {
        return res
          .status(404)
          .json({ user: { email: "E-mail já cadastrado" } });
      }
      return res.status(200).json({ success: "E-mail disponível" });
    }

    const { name, email, password } = req.body.user;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: encryptedPassword,
    };

    await knex("users").insert(newUser);

    return res.status(200).json({ success: "Novo Usuario Cadastrado" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = registerUser;
