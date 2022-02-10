import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordState, setPasswordState] = useState();
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    checkpassword: "",
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    complement: "",
    zipcode: "",
    district: "",
    city: "",
  });
  return {
    openModal,
    setOpenModal,
    openEditMenu,
    setOpenEditMenu,
    clientForm,
    setClientForm,
    openClientModal,
    setOpenClientModal,
    formSubmitted,
    setFormSubmitted,
    userForm,
    setUserForm,
    passwordState,
    setPasswordState,
  };
}

export default useUserProvider;
