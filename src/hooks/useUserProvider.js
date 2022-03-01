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


  const [showEditModal, setShowEditModal] = useState(false);
  const [openBillModal, setOpenBillModal] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [submitClientForm, setSubmitClientForm] = useState(false);
  const [submitBillForm, setSubmitBillForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordState, setPasswordState] = useState();
  const [clientDetail, setClientDetail] = useState({});
  const [showBillDetail, setShowBillDetail] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showDeleteBillModal, setShowDeleteBillModal] = useState(false);
  const [type, setType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [deleteBill, setDeleteBill] = useState(false);
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
    showEditModal,
    setShowEditModal,
    removeClientDetails,
    setClienDetailsLocal,
    clientDetailsLocal,
    type,
    setType,
    showBillDetail, 
    setShowBillDetail,
    inputForms,
    setInputForms,
    update,
    setUpdate,
    openBillModal,
    setOpenBillModal,
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
    showToast,
    setShowToast,
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
    deleteBill,
    setDeleteBill,
    showDeleteBillModal,
    setShowDeleteBillModal,
    toastMessage,
    setToastMessage,
    toastType,
    setToastType,
  };
}

export default useUserProvider;
