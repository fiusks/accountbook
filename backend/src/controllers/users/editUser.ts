import { editUser } from "../../services/users/updateUserService";

const updatetUser = async (req, res) => {
  const { user } = req.body
  await editUser(user).then(() => {
    return res.status(200).json({ message: "Usuário atualizado com sucesso" })
  }).catch((error) => {
    return res.status(400).jsont({ message: error })
  })
};

export default editUser;
