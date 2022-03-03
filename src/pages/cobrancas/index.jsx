import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import cobrancas from "../../assets/images/cobrancas.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import editBillIcon from "../../assets/images/editBillIcon.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import BillModal from "../../components/billModall/layout";
import DeleteBill from "../../components/deleteBillModal/DeleteBill";
import { SearchInput } from "../../components/inputs";
import NotFoundCard from "../../components/notFound";
import useUser from "../../hooks/useUser";
import { formatDate, formatToCurrency } from "../../services/formatData";
import BillDetails from "../../components/billDetailsModal";
import "./style.scss";

function Cobrancas() {
  const [orderById, setOrderById] = useState("cres");
  const [orderByClientName, setOrderByClientName] = useState("desc");
  const [bills, setBills] = useState([]);
  const [billToDelete, setBillToDelete] = useState({});

  const {
    submitBillForm,
    setOpenBillModal,

    setInputForms,
    setType,
    homeData,
    billsFilters,
    setBillsFilters,
    deleteBill,
    setShowDeleteBillModal,
    showDeleteBillModal,
    setShowBillDetail,
    showBillDetail,
    billDetails,
    setBillDetails,
  } = useUser();
  const handleShowEdit = (event) => {
    event.stopPropagation();
    setOpenBillModal(true);
  };
  const token = document.cookie.split("=")[1];

  const [activeSearch, setActiveSearch] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const tableHeader = [
    "Cliente",
    "ID Cob.",
    "Valor",
    "Data de Venc.",
    "Status ",
    "Descrição",
  ];

  useEffect(() => {
    if (!billsFilters?.status && !billsFilters?.search) {
      setShowNotFound(false);
      getBills();
    }
    if (activeSearch) {
      getFilteredBills();
    }
    return setActiveSearch(false);
  }, [submitBillForm, deleteBill, billsFilters, activeSearch]);

  useEffect(() => {
    if (billsFilters?.search || billsFilters?.status) {
      getFilteredBills();
    }
  }, []);

  function handleKeyUp(event) {
    if (event.which === 13) {
      if (!billsFilters?.search) {
        return;
      }
      setActiveSearch(true);
    }
  }

  async function getBills() {
    try {
      if (billsFilters?.status) {
        if (billsFilters.status === "pagas") {
          setBills(homeData.paidBills);
          setBillsFilters({});
          return;
        } else if (billsFilters.status === "vencidas") {
          setBills(homeData.overdueBills);
          setBillsFilters({});
          return;
        } else if (billsFilters.status === "previstas") {
          setBills(homeData.unpaidBills);
          setBillsFilters({});
          return;
        }
      }
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}getBills`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setBills(data.bills);
    } catch (error) {
      return console.log(error.message);
    }
  }

  async function getFilteredBills() {
    const payload = { bills: billsFilters };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}listFilteredBills`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (data.bills === "Nenhum resultado encontrado") {
        setShowNotFound(true);
        return;
      }
      setShowNotFound(false);
      setBills(data.bills);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const orderedById = [...bills];
    if (orderById === "cres") {
      orderedById.sort((billA, billB) => {
        return billB.id - billA.id;
      });
      setBills(orderedById);
      return;
    }

    if (orderById === "desc") {
      orderedById.sort((billA, billB) => {
        return billA.id - billB.id;
      });
      setBills(orderedById);
      return;
    }
  }, [orderById]);

  useEffect(() => {
    const orderedByName = [...bills];
    if (orderByClientName === "cres") {
      orderedByName.sort((billA, billB) => {
        return billA.name.toLowerCase().localeCompare(billB.name.toLowerCase());
      });
      setBills(orderedByName);
      return;
    }

    if (orderByClientName === "desc") {
      orderedByName.sort((billA, billB) => {
        return billB.name.toLowerCase().localeCompare(billA.name.toLowerCase());
      });
      setBills(orderedByName);
      return;
    }
  }, [orderByClientName]);

  function formatBillStatus(billStatus) {
    if (billStatus === "paid") {
      return "Paga";
    }
    if (billStatus === "pending") {
      return "Pendente";
    }
    if (billStatus === "overdue") {
      return "Vencida";
    }
  }

  function handleSetEditForm(bill) {
    setInputForms({
      id: bill.id,
      clientId: bill.client_id,
      name: bill.name,
      desc: bill.description,
      dueDate: bill.due_date.substr(0, 10),
      amount: bill.amount,
      status: bill.bill_status === "overdue" ? "Pending" : bill.bill_status,
    });
  }
  function handleClickLixeira(event, billDelete) {
    setShowDeleteBillModal(true);
    setBillToDelete(billDelete);
    event.stopPropagation();
  }
  function handleSearchChange(event) {
    setBillsFilters((preivousState) => ({
      ...preivousState,
      search: event.target.value,
    }));
  }

  function handleBillDetails(thisBill) {
    setBillDetails(thisBill);
    setShowBillDetail(true);
  }

  return (
    <Container fluid>
      <Row className="bills-header-container">
        <Col className="bills-header-title">
          <img src={cobrancas} alt="bill-icon" />
          <h1>Cobranças</h1>
        </Col>
        <Col className="bills-header-options">
          <img src={filterButton} alt="settings icon" className="icon-input" />
          <SearchInput
            onChange={handleSearchChange}
            value={billsFilters.search}
            onKeyUp={handleKeyUp}
          />
        </Col>
      </Row>
      <Container fluid>
        <Row className="px-5">
          <Col className="px-5">
            <Table responsive className="table-hover clients-table">
              <thead style={{ borderRadius: "3rem" }}>
                <tr>
                  {tableHeader.map((header, index) => {
                    return (
                      <th key={`th-${index}`}>
                        {header === "Cliente" && (
                          <img
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setOrderByClientName(
                                orderByClientName === "desc" ? "cres" : "desc"
                              )
                            }
                            src={upDownArrowIcon}
                            alt="filter arrow icon"
                          />
                        )}
                        {header === "ID Cob." && (
                          <img
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setOrderById(
                                orderById === "desc" ? "cres" : "desc"
                              )
                            }
                            src={upDownArrowIcon}
                            alt="filter arrow icon"
                          />
                        )}
                        {header}
                      </th>
                    );
                  })}
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {!showNotFound &&
                  bills.map((bill) => {
                    return (
                      <tr onClick={() => handleBillDetails(bill)} key={bill.id}>
                        <td>{bill.name}</td>
                        <td>{bill.id}</td>
                        <td>{formatToCurrency(bill.amount)}</td>
                        <td>{formatDate(bill.due_date)}</td>
                        <td>
                          <span className={formatBillStatus(bill.bill_status)}>
                            {formatBillStatus(bill.bill_status)}
                          </span>
                        </td>
                        <td>{bill.description}</td>
                        <td>
                          <img
                            style={{ cursor: "pointer" }}
                            src={editBillIcon}
                            alt="editar Cobrança"
                            onClick={(event) => {
                              handleSetEditForm(bill);
                              setType("editBill");
                              handleShowEdit(event);
                            }}
                          />
                        </td>
                        <td>
                          <img
                            style={{ cursor: "pointer" }}
                            src={deleteIcon}
                            alt="excluir cobrança"
                            onClick={(event) => handleClickLixeira(event, bill)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {showNotFound && <NotFoundCard />}
          </Col>
        </Row>
      </Container>
      <BillModal title={"Edição"} />
      {showBillDetail && (
        <BillDetails
          nome={billDetails.name}
          descricao={billDetails.description}
          dataVencimento={formatDate(billDetails.due_date)}
          valor={formatToCurrency(billDetails.amount)}
          idCobranca={billDetails.id}
          status={formatBillStatus(billDetails.bill_status)}
        />
      )}

      {showDeleteBillModal && (
        <DeleteBill
          status={billToDelete.bill_status}
          dataVencimento={billToDelete.due_date}
          cobrancaId={billToDelete.id}
        />
      )}
    </Container>
  );
}

export default Cobrancas;
