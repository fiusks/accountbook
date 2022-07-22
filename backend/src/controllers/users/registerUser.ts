import prisma from "../../database/client";
import bcrypt from "bcrypt"
import { IUserData } from "../../models/users";

const registerUser = async (req, res) => {


  try {

    const { name, email, password } = req.body as IUserData
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: encryptedPassword,
    }

    await prisma.user.create({
      data: newUser
    })

    return res.status(200).json({ success: "Novo Usuario Cadastrado" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export default registerUser;
