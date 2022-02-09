import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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
  };
}

export default useUserProvider;
