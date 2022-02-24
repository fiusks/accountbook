import { useState } from "react";
import { useLocalStorage } from "react-use";
function useUserProvider() {
  const [clientDetailsLocal, setClienDetailsLocal, removeClientDetails] =
    useLocalStorage("clientDetails", {});
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
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [clientDetail, setClientDetail] = useState({});
  const [billDetail, setBillDetail] = useState({});
  const [update, setUpdate] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [type, setType] = useState("");
  const [clientsFilters, setClientsFilters] = useState({
    status: "",
    search: "",
  });
  const [billsFilters, setBillsFilters] = useState({
    status: "",
    search: "",
  });
  const [inputForms, setInputForms] = useState({
    id: "",
    name: "",
    desc: "",
    amount: "",
    dueDate: "",
    status: "pending",
  });

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
    removeClientDetails,
    setClienDetailsLocal,
    clientDetailsLocal,
    toastErrorMessage,
    setToastErrorMessage,
    toastError,
    setToastError,
    type,
    setType,
    setBillDetail,
    billDetail,
    inputForms,
    setInputForms,
    update,
    setUpdate,
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
    billsFilters,
    setBillsFilters,
    clientsFilters,
    setClientsFilters,
  };
}

export default useUserProvider;
