import "./style.scss";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import editIcon from "../../assets/images/editicon.svg";
import arrowUpDown from "../../assets/images/arrowupdown.svg";
import deleteIconRed from "../../assets/images/deleteIconRed.svg";
import { Container, Row, Col, Table } from "react-bootstrap";
import ClientModal from "../../components/client-modal/layout";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { formatCPF, formatCEP, formatPhone } from "../../services/formatData";
import ToastComponent from "../../components/toast";

function ClientsDetails() {
  const tableHeaders = [
    "ID Cobrança",
    "Data de Vencimento",
    "Valor",
    "Status",
    "Descrição",
    "",
    "",
  ];

  const { clientDetail, clientToast, submitClientForm, setClientForm } =
    useUser();
  const [client, setClient] = useState({});
  const { token } = useAuth();

  async function loadClient() {
    try {
      const response = await fetch(
        `https://api-testes-equipe-06.herokuapp.com/getClients/${clientDetail.id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setClient(data.client);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadClient();
  }, [submitClientForm]);

  function populateBills(bills) {
    return bills.map((bill) => {
      return (
        <tr key={bill.id}>
          <td>{bill.id}</td>
          <td>
            {new Intl.DateTimeFormat("pt-BR").format(Date.parse(bill.due_date))}
          </td>
          <td>{bill.amount}</td>
          <td>{bill.bill_status === "pending" ? "Pendente" : "Pago"}</td>
          <td>{bill.description}</td>
          <td>
            <img key={`edit-${bill.id}`} src={editIcon} alt="edit icon" />
          </td>
          <td>
            <img
              key={`delete-${bill.id}`}
              src={deleteIconRed}
              alt="delete icon"
            />
          </td>
        </tr>
      );
    });
  }

  return (
    <Container fluid>
      <Row className="w-100 client-page-container">
        <Col>
          <Row>
            <Col>
              <img src={clientsIcon} alt="" />
              <h1>{client.name}</h1>
            </Col>
          </Row>
          <Row className="client-data-container">
            <Col>
              <Row>
                <Col className="client-detail-header">
                  <h3>Dados do cliente</h3>
                  <ClientModal type="Editar" client={client} />
                </Col>
              </Row>
              <Row className="">
                <Col>
                  <h5>Telefone*</h5>
                  <h6>{formatPhone(client.phone)}</h6>
                </Col>

                <Col>
                  <h5>CPF</h5>
                  <h6>{formatCPF(client.cpf)}</h6>
                </Col>

                <Col>
                  <h5>Endereço*</h5>
                  <h6>{client.address}</h6>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h5>Bairro</h5>
                  <h6>{client.district}</h6>
                </Col>
                <Col>
                  <h5>Complemento</h5>
                  <h6>{client.complement}</h6>
                </Col>
                <Col>
                  <h5>CEP</h5>
                  <h6>{formatCEP(client.zipcode)}</h6>
                </Col>
                <Col>
                  <h5>Cidade</h5>
                  <h6>{client.city}</h6>
                </Col>
                <Col>
                  <h5>UF</h5>
                  <h6>{client.state}</h6>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="client-data-container">
            <Col>
              <Row>
                <Col className="client-detail-header">
                  <h3>Cobranças do CLiente</h3>
                  <ClientModal type="Editar" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table>
                    <thead>
                      <tr>
                        {tableHeaders.map((header) => {
                          return (
                            <th>
                              {header !== "Descrição" && header !== "" && (
                                <img
                                  src={arrowUpDown}
                                  alt="filter arrow icon"
                                />
                              )}
                              {header}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {client.bills ? populateBills(client.bills) : ""}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
          {clientToast && <ToastComponent />}
        </Col>
      </Row>
    </Container>
  );
}

export default ClientsDetails;
