import "./style.scss";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import cobrancas from "../../assets/images/cobrancas.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import editBillIcon from "../../assets/images/editBillIcon.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import BillModal from "../../components/billModall/layout";
import { SearchInput } from "../../components/input-generic";
import useUser from "../../hooks/useUser";
import NotFoundCard from "../../components/notFound";

function Cobrancas() {
  const [bills, setBills] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { submitBillForm, setOpenBillModal, setInputForms, setType } =
    useUser();
  const handleShowEdit = () => setOpenBillModal(true);
  const token = document.cookie.split("=")[1];
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
  }, [submitBillForm]);

  async function getBills() {
    try {
      const response = await fetch(
        `https://api-testes-equipe-06.herokuapp.com/getBills`,
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
  async function handleSearch() {
    const payload = {
      filterBill: {
        params: searchInput,
      },
    };
    try {
      const response = await fetch(
        "https://api-testes-equipe-06.herokuapp.com/searchBills",
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

  function formatNumberToLocalCurrency(inputNumber) {
    const convertedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputNumber);
    return convertedValue;
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
  function findDetails(billId) {
    const billselected = bills.find((bill) => bill.id === billId);
    console.log(billselected, "billselected");
    setEditInputValues(billselected);
  }
  function setEditInputValues(billselected) {
    setInputForms({
      id: billselected.id,
      clientId: billselected.client_id,
      name: billselected.name,
      desc: billselected.description,
      dueDate: formatDate(billselected.due_date)
        .replaceAll("/", "-")
        .split("-")
        .reverse()
        .join("-"),
      amount: billselected.amount,
      status:
        billselected.bill_status === "overdue"
          ? "Pending"
          : billselected.bill_status,
    });
  }
  function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR").format(Date.parse(date) + 10800000);
  }
  function handleSearchChange(event) {
    setSearchInput(event.target.value);
  }

  return (
    <Container fluid style={{ background: "#FFFF", borderRadius: "3rem" }}>
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
              <Table responsive className="table-hover">
                <thead style={{ borderRadius: "3rem" }}>
                  <tr>
                    {tableHeader.map((header, index) => {
                      return (
                        <th key={`th-${index}`}>
                          {header === "Cliente" && (
                            <img
                              src={upDownArrowIcon}
                              alt="filter arrow icon"
                            />
                          )}
                          {header === "ID Cob." && (
                            <img
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
                  {bills.map((bill) => {
                    return (
                      <tr key={bill.id}>
                        <td>{bill.name}</td>
                        <td>{bill.id}</td>
                        <td>{formatNumberToLocalCurrency(bill.amount)}</td>
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
                            onClick={() => {
                              findDetails(bill.id);
                              setType("/editBill");
                              handleShowEdit();
                            }}
                          />
                        </td>
                        <td>
                          <img
                            style={{ cursor: "pointer" }}
                            src={deleteIcon}
                            alt="excluir cobrança"
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
        </Row>
      </Container>
      <BillModal />
    </Container>
  );
}

export default Cobrancas;
