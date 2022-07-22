import jwt from "jsonwebtoken"
import prisma from "../../database/client";
import { config } from "../../config/config"

interface IAccessToken {
  id?: number,
}

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "No authentication bearer token specified in authorization header." })
  }
  if (authorization === "Bearer" || !authorization.includes("Bearer")) {
    return res.status(401).json({ error: "Malformed token" })
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
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({
      success: userExist
    })



  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default validateToken;
