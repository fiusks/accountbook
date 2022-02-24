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
import BillModal from "../../components/billModall/layout";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formatCPF, formatPhone } from "../../services/formatData";
import { FilterBox } from "../../components/filter-box/index";
import NotFoundCard from "../../components/notFound";

const tableHeader = [
  "Cliente",
  "CPF",
  "E-mail",
  "Telefone",
  "Status",
  "Criar Cobrança",
];

function Clientes() {
  const {
    clientToast,
    openBillModal,
    submitClientForm,
    setOpenBillModal,
    setClientDetail,
    clientsFilters,
    setClientsFilters,
    inputForms,
    setInputForms,
    setType,
    homeData,
  } = useUser();

  const location = useLocation();

  const handleShowBill = () => setOpenBillModal(true);
  const token = document.cookie.split("=")[1];
  const [tableClients, setTableClients] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientsFilters?.search && !clientsFilters?.status) {
      setShowNotFound(false);
      getClientList();
    }
    console.log(activeSearch);
    if (activeSearch) {
      getFilteredClients();
    }
    return setActiveSearch(false);
  }, [submitClientForm, clientsFilters]);
  useEffect(() => {
    if (clientsFilters?.search || clientsFilters?.status) {
      getFilteredClients();
    }
  }, []);
  async function getClientList() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}listClients`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setTableClients(data.client);
    } catch (error) {
      console.log(error);
    }
  }
  async function getFilteredClients() {
    const payload = { client: clientsFilters };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}listFilteredClients`,
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
      if (data.client === "Nenhum resultado encontrado") {
        setShowNotFound(true);
        return;
      }
      setShowNotFound(false);
      setTableClients(data.client);
    } catch (error) {
      console.log(error);
    }
  }

  function findDetails(clientId) {
    const clientSelected = tableClients.find(
      (client) => client.id === clientId
    );
    console.log(clientSelected);
    // document.cookie = `clientId = ${clientSelected.id} ; path=/`;
    setClientDetail(clientSelected);
  }
  function handleClientDetails(clientId) {
    findDetails(clientId);
    navigate("/detalhesCliente");
  }
  function handleKeyUp(event) {
    if (event.which === 13) {
      if (!clientsFilters?.search) {
        return;
      }
      setActiveSearch(true);
    }
  }
  function handleSearchChange(event) {
    setClientsFilters((preivousState) => ({
      ...preivousState,
      search: event.target.value,
    }));
  }
  function handleSetForm(clientId, clientName) {
    setInputForms({
      name: clientName,
      desc: "",
      dueDate: "",
      amount: "",
      status: "pending",
      clientId: clientId,
    });
  }
  return (
    <Container
      fluid
      className="px-5"
      style={{ background: "#FFFF", borderRadius: "3rem" }}
    >
      <Row className="client-header-container">
        <Col className="client-header-title">
          <img src={clientsIcon} alt="client icons" />
          <h1>Clientes</h1>
        </Col>
        <Col className="client-header-options">
          <ClientModal type="Adicionar" />
          {showFilter && <FilterBox type="client" />}
          <img
            src={filterButton}
            alt="settings icon"
            className="icon-input"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          />
          <SearchInput
            onChange={handleSearchChange}
            value={clientsFilters.search}
            onKeyUp={handleKeyUp}
          />
        </Col>
      </Row>
      <Container fluid>
        <Row className="px-5">
          <Col className="px-5">
            <Table responsive className="table-hover  ">
              <thead>
                <tr>
                  {tableHeader.map((header, index) => {
                    return (
                      <th key={`th-${index}`}>
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
                {!showNotFound &&
                  tableClients.map((client) => {
                    return (
                      <tr key={client.id}>
                        <td
                          onClick={() => handleClientDetails(client.id)}
                          className="client-name"
                          style={{ cursor: "pointer" }}
                        >
                          {client.name}
                        </td>
                        <td>{formatCPF(client.cpf)}</td>
                        <td>{client.email}</td>
                        <td>{formatPhone(client.phone)}</td>
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
                          <img
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setType("registerBill");
                              handleSetForm(client.id, client.name);
                              handleShowBill();
                            }}
                            src={addPaperIcon}
                            alt="add paper icon"
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
      <BillModal />
      {clientToast && <ToastComponent />}
    </Container>
  );
}

export default Clientes;
