import jwt from "jsonwebtoken"
import knex from "../../database/connection"
import { config } from "../../config/config"

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === "Bearer") {
    return res.status(400).json({ message: "Token não informado." });
  }

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, config.secret!);

    if (!id) {
      return res.status(400).json({ mensagem: "Token inválido." });
    }

    const userExist = await knex("users").where({ id }).first();

    if (!userExist) {
      return res.status(404).json({ message: ["Usuário não encontrado"] });
    }

    return res.status(200).json({
      success: userExist
    })



  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = validateToken;