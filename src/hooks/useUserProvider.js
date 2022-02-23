import { useState } from "react";

function useUserProvider() {
  const [homeData, setHomeData] = useState({
    overdueClients: [],
    quantityOverdueClients: 0,
    ondueClients: [],
    quantityOndueClients: 0,
    overdueBills: [],
    quantityOverdueBills: 0,
    paidBills: [],
    quantityPaidBills: 0,
    unpaidBills: [],
    quantityUnpaidBills: 0,
    totalAmountPaid: 0,
    totalAmountUnpaid: 0,
    totalAmountOverdue: 0,
  });

  
  const [openModal, setOpenModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [submitClientForm, setSubmitClientForm] = useState(false);
  const [submitBillForm, setSubmitBillForm] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordState, setPasswordState] = useState();
  const [clientToast, setClientToast] = useState(false);
  const [clientDetail, setClientDetail] = useState({});
  const [update, setUpdate] = useState(false);
  
  const [clientsFilters, setClientsFilters] = useState({})
  const [billsFilters, setBillsFilters] = useState({})
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
    update,
    setUpdate,
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
    homeData,
    setHomeData,
    clientDetail,
    setClientDetail,
    submitBillForm,
    setSubmitBillForm,

  };
}

export default useUserProvider;
