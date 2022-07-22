import prisma from "../../database/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

const login = async (req, res) => {
  const { email, password } = req.body.login;

  try {

    const userExist = await prisma.user.findFirst({
      where: {
        email
      }
    })


    if (!userExist) {
      return res
        .status(404)
        .json({ user: { login: "E-mail e/ou senha inválidos" } });
    }

    const checkPassword = await bcrypt.compare(password, userExist.password);

    if (!checkPassword) {
      return res
        .status(404)
        .json({ user: { login: "E-mail e/ou senha inválidos" } });
    }

    const { password: _, ...userData } = userExist;

    const token = jwt.sign(userData, config.secret!, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Login efetuado com sucesso",
      token: token,
      dados_do_usuario: userData,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default login;
