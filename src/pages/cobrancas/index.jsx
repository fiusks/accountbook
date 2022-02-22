import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import cobrancas from "../../assets/images/cobrancas.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import { SearchInput } from "../../components/input-generic";
import useAuth from "../../hooks/useAuth";
import editBillIcon from "../../assets/images/editBillIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import useUser from "../../hooks/useUser";
import "./style.scss";

function Cobrancas() {
  const [bills, setBills] = useState([]);
  const token = document.cookie.split("=")[1];
  const { submitBillForm } = useUser();

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

  function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR").format(Date.parse(date) + 10800000);
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
          <SearchInput />
        </Col>
      </Row>
      <Container fluid>
        <Row className="px-5">
          <Col className="px-5">
            <Table responsive className="table-hover">
              <thead>
                <tr>
                  {tableHeader.map((header, index) => {
                    return (
                      <th key={`th-${index}`}>
                        {header === "Cliente" && (
                          <img src={upDownArrowIcon} alt="filter arrow icon" />
                        )}
                        {header === "ID Cob." && (
                          <img src={upDownArrowIcon} alt="filter arrow icon" />
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
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Cobrancas;
