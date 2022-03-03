import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import cobrancas from "../../assets/images/cobrancas.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import editBillIcon from "../../assets/images/editBillIcon.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import BillDetails from "../../components/billDetailsModal";
import BillModal from "../../components/billModall/layout";
import BillsContentLoading from "../../components/billsContentLoading";
import DeleteBill from "../../components/deleteBillModal/DeleteBill";
import { SearchInput } from "../../components/inputs";
import NotFoundCard from "../../components/notFound";
import useUser from "../../hooks/useUser";
import { formatDate, formatToCurrency } from "../../services/formatData";
import "./style.scss";

function Cobrancas() {
  const [orderById, setOrderById] = useState('cres');
  const [orderByClientName, setOrderByClientName] = useState('desc');
  const [bills, setBills] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [billToDelete, setBillToDelete] = useState({});
  const [ isLoading, setIsLoading] = useState(true);

  const {
    submitBillForm,
    setOpenBillModal,
    inputForms,
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
    setBillDetails
  } = useUser();
  const handleShowEdit = (event) => {
    event.stopPropagation();
    setOpenBillModal(true)
  };
  const token = document.cookie.split("=")[1];

  const [showFilter, setShowFilter] = useState(false);
  const tableHeader = [
    "Cliente",
    "ID Cob.",
    "Valor",
    "Data de Venc.",
    "Status ",
    "Descrição",
  ];

  useEffect(() => {
    getBills();
  }, [submitBillForm, deleteBill]);

  async function getBills() {
    try {
      if (billsFilters?.status) {
        if (billsFilters.status === "pagas") {
          setBills(homeData.paidBills);
          setIsLoading(false);
          setBillsFilters({});
          return;
        } else if (billsFilters.status === "vencidas") {
          setBills(homeData.overdueBills);
          setIsLoading(false);
          setBillsFilters({});
          return;
        } else if (billsFilters.status === "previstas") {
          setBills(homeData.unpaidBills);
          setIsLoading(false);
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
      setIsLoading(false);
      setOrderById('desc');
      setOrderByClientName('cres');

    } catch (error) {
      return console.log(error.message);
    }
  };


  useEffect(() => {

    if (orderById === 'cres') {
      bills.sort((billA, billB) => {
        return billB.id - billA.id
      });
      return;
    };

    if (orderById === 'desc') {
      bills.sort((billA, billB) => {
        return billA.id - billB.id
      });
      return;
    };

  }, [orderById])

  useEffect(() => {

    if (orderByClientName === 'cres') {
      bills.sort((billA, billB) => {
        return billA.name.toLowerCase().localeCompare(billB.name.toLowerCase())
      });
      return;
    };

    if (orderByClientName === 'desc') {
      bills.sort((billA, billB) => {
        return billB.name.toLowerCase().localeCompare(billA.name.toLowerCase())
      });
      return;
    };

  }, [orderByClientName])



  async function handleSearch() {
    if (!searchInput) {
      getBills();
      return;
    }
    const payload = {
      filterBill: {
        params: searchInput,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}searchBills`,
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
      console.log(data);

      setBills(data);

    } catch (error) {
      return console.log(error.message);
    }
  }

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
    setSearchInput(event.target.value);
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
            value={searchInput}
            searchFunction={handleSearch}
          />
        </Col>
      </Row>
      <Container fluid>
        <Row className="px-5">
          <Col className="px-5">
            {!bills.message ? (
              <Table responsive className="table-hover clients-table">
                <thead style={{ borderRadius: "3rem" }}>
                  <tr>
                    {tableHeader.map((header, index) => {
                      return (
                        <th key={`th-${index}`}>
                          {header === "Cliente" && (
                            <img
                              style={{ cursor: 'pointer' }}
                              onClick={() => setOrderByClientName(orderByClientName === 'desc' ? 'cres' : 'desc')}
                              src={upDownArrowIcon}
                              alt="filter arrow icon"
                            />
                          )}
                          {header === "ID Cob." && (
                            <img
                              style={{ cursor: 'pointer' }}
                              onClick={() => setOrderById(orderById === 'desc' ? 'cres' : 'desc')}
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
                  
                  { !isLoading && bills.map((bill) => {
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
              
            ) : (
              <NotFoundCard />
            )}
          </Col>
          { isLoading && <BillsContentLoading/>}
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
