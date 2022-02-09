import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toogleSubmitForm, setToogleSubmitForm] = useState();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
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
    userData,
    setUserData,
    clientForm,
    setClientForm,
    formSubmitted,
    setFormSubmitted,
    openClientModal,
    setOpenClientModal,
    toogleSubmitForm,
    setToogleSubmitForm,
  };
}

export default useUserProvider;
