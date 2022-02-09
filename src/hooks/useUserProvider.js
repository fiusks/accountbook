import { useState } from "react";

function useUserProvider() {
  const [token, setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });

  return {
    openModal,
    setOpenModal,
    openEditMenu,
    setOpenEditMenu,
    userData,
    setUserData,
    token,
    setToken
  };
}

export default useUserProvider;
