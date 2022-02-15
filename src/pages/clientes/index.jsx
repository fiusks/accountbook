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
import BillingModal from "../../components/cobrancaModal";
import { useState } from "react";

const tableHeader = [
  "Cliente",
  "CPF",
  "E-mail",
  "Telefone",
  "Status",
  "Criar Cobrança",
];

const tableData = [
  {
    nome: "Sara Silva",
    cpf: 223456787,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "Carlos Prado",
    cpf: 223456781,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "lara Brito",
    cpf: 223456782,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "Sara Silva",
    cpf: 223456787,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Inadimplente",
  },
  {
    nome: "Carlos Prado",
    cpf: 223456781,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "lara Brito",
    cpf: 223456782,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
];

function Clientes() {
  const { clientToast } = useUser();
  const [show, setShow] = useState(false);
  const handleshow = () => setShow(true);
  return (
    <Container fluid className="px-5 ">
      <Row className="client-header-container">
        <Col className="client-header-title">
          <img src={clientsIcon} alt="client icons" />
          <h1>Clientes</h1>
        </Col>
        <Col className="client-header-options">
          <ClientModal />
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
                {tableData.map((cliente, id) => {
                  return (
                    <tr key={id}>
                      <td className="client-name">{cliente.nome}</td>
                      <td>{cliente.cpf}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.phone}</td>
                      <td>
                        <span
                          className={
                            cliente.status === "Inadimplente"
                              ? "inadimplente"
                              : "em-dia"
                          }
                        >
                          {cliente.status}
                        </span>
                      </td>
                      <td>
                        <img
                          onClick={handleshow}
                          src={addPaperIcon}
                          alt="add paper icon"
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
      <BillingModal></BillingModal>
      {clientToast && <ToastComponent />}
    </Container>
  );
}

export default Clientes;
