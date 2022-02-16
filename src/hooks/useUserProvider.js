import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [submitClientForm, setSubmitClientForm] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordState, setPasswordState] = useState();
  const [clientToast, setClientToast] = useState(false);
  const [clientDetail, setClientDetail] = useState({});
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    checkpassword: "",
  });
  const [billForm, setBillForm] = useState({
    name: "",
    desc: "",
    value: "",
    dueDate: "",
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
    billForm,
    setBillForm,
    openBillModal,
    setOpenBillModal,
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
    clientToast,
    setClientToast,
    submitClientForm,
    setSubmitClientForm,
    clientDetail, 
    setClientDetail,
  };
}

export default useUserProvider;
