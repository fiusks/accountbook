import jwt from "jsonwebtoken"
import prisma from "../database/client";
import { config } from "../config/config"

interface IAccessToken {
  id?: number,
}

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization === "Bearer") {
    return res.status(400).json({ message: "Token não informado." });
  }

  try {
    const token = authorization.replace("Bearer ", "")

    let user: IAccessToken = {}

    try {
      user = jwt.verify(token, config.secret!) as IAccessToken
    } catch (error) {
      res.status(401).json({ error: "Invalid token" })
    }

    const userExist = await prisma.user.findFirst({
      where: {
        id: user.id
      }
    })

    if (!userExist) {
      return res.status(404).json({ message: ["Usuário não encontrado"] });
    }

    const { id: userId } = userExist;
    req.user = { id: userId };

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default checkToken;
