import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    checkpassword: "",
  });
  const [clickOnSubmit, setClickOnSubtmit] = useState(false);

  return {
    openModal,
    setOpenModal,
    openEditMenu,
    setOpenEditMenu,
    userForm,
    setUserForm,
    clickOnSubmit,
    setClickOnSubtmit,
  };
}

export default useUserProvider;
