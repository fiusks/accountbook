const jwt = require("jsonwebtoken");
const knex = require("../database/connection");
const secret = require("../config");

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === "Bearer") {
    return res.status(400).json({ message: "Token não informado." });
  }

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, secret);

    if (!id) {
      return res.status(400).json({ mensagem: "Token inválido." });
    }

    const userExist = await knex("users").where({ id }).first();

    if (!userExist) {
      res.status(404).json({ message: ["Usuário não encontrado"] });
    }

    // O Login já gera o token e envia para o front que armazena o token em um contexto, não há necessidade de enviar os dados de usuário a cada validação de token
    if (Object.keys(req.body)[0] === "user") {
      const { password, ...userData } = userExist;
      req.user = userData;
    } else {
      const { id } = userExist;
      req.user = { id };
    }

    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = checkToken;
