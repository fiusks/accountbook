import "./style.scss";
import ClientModal from "../../components/client-modal/layout";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import addPaperIcon from "../../assets/images/addpapericon.svg";
import { SearchInput } from "../../components/input-generic";
import ToastComponent from "../../components/toast";
import { Table, Container, Row, Col } from "react-bootstrap";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tableHeader = [
  "Cliente",
  "CPF",
  "E-mail",
  "Telefone",
  "Status",
  "Criar Cobrança",
];

function Clientes() {
  const { clientToast, submitClientForm, setClientDetail } = useUser();
  const { token } = useAuth();
  const [tableClients, setTableClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getClientList() {
      try {
        const response = await fetch(
          "https://api-testes-equipe-06.herokuapp.com/listClients",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setTableClients(data);
      } catch (error) {
        console.log(error);
      }
    }
    getClientList();
  }, [submitClientForm]);

  function handleClientDetails(clientId) {
    const clientSelected = tableClients.find(
      (client) => client.id === clientId
    );
    setClientDetail(clientSelected.id);
    navigate("/dashboard/detalhesCliente");
  }

  return (
    <Container fluid className="px-5 ">
      <Row className="client-header-container">
        <Col className="client-header-title">
          <img src={clientsIcon} alt="client icons" />
          <h1>Clientes</h1>
        </Col>
        <Col className="client-header-options">
          <ClientModal type="Adicionar" />
          <img src={filterButton} alt="settings icon" className="icon-input" />
          <SearchInput />
        </Col>
      </Row>
      <Container fluid>
        <Row className="px-5">
          <Col className="px-5">
            <Table responsive className="table-hover  ">
              <thead>
                <tr>
                  {tableHeader.map((header) => {
                    return (
                      <th>
                        {header === "Cliente" && (
                          <img src={upDownArrowIcon} alt="filter arrow icon" />
                        )}
                        {header === "Status" && (
                          <img src={upDownArrowIcon} alt="filter arrow icon" />
                        )}
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tableClients.map((client) => {
                  return (
                    <tr key={client.id}>
                      <td
                        onClick={() => handleClientDetails(client.id)}
                        className="client-name"
                      >
                        {client.name}
                      </td>
                      <td>{client.cpf}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>
                        <span
                          className={
                            client.status === "Inadimplente"
                              ? "inadimplente"
                              : "em-dia"
                          }
                        >
                          {client.status}
                        </span>
                      </td>

                      <td>
                        <img src={addPaperIcon} alt="add paper icon" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {clientToast && <ToastComponent />}
    </Container>
  );
}

export default Clientes;
