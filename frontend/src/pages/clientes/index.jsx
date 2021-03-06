import "./style.scss";
import ClientModal from "../../components/client-modal/layout";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import addPaperIcon from "../../assets/images/addpapericon.svg";
import { SearchInput } from "../../components/inputs";
import { Table, Container, Row, Col } from "react-bootstrap";
import useUser from "../../hooks/useUser";
import BillModal from "../../components/billModall/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCPF, formatPhone } from "../../services/formatData";
import { FilterBox } from "../../components/filter-box/index";
import NotFoundCard from "../../components/notFound";
import ClientsContentLoading from "../../components/clientsContentLoading";

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
    submitClientForm,
    setOpenBillModal,
    setClientDetail,
    clientsFilters,
    setClientsFilters,
    setInputForms,
    setType,
    setClienDetailsLocal,
  } = useUser();

  const handleShowBill = () => setOpenBillModal(true);
  const token = document.cookie.split("=")[1];
  const [tableClients, setTableClients] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orderByClientName, setOrderByClientName] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientsFilters?.search && !clientsFilters?.status) {
      setShowNotFound(false);
      getClientList();
    }
    if (activeSearch) {
      getFilteredClients();
    }
    return setActiveSearch(false);
  }, [submitClientForm, clientsFilters, activeSearch]);
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
      setIsLoading(false);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const orderedByName = [...tableClients];
    if (orderByClientName === "cres") {
      orderedByName.sort((clientA, clientB) => {
        return clientA.name
          .toLowerCase()
          .localeCompare(clientB.name.toLowerCase());
      });
      setTableClients(orderedByName);
      return;
    }

    if (orderByClientName === "desc") {
      orderedByName.sort((clientA, clientB) => {
        return clientB.name
          .toLowerCase()
          .localeCompare(clientA.name.toLowerCase());
      });
      setTableClients(orderedByName);
      return;
    }
  }, [orderByClientName]);

  function findDetails(clientId) {
    const clientSelected = tableClients.find(
      (client) => client.id === clientId
    );

    setClienDetailsLocal({
      clientId: clientSelected.id,
      clientName: clientSelected.name,
    });
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
    <Container fluid className="px-5">
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
          <Col>
            <Table responsive className="table-hover clients-table">
              <thead>
                <tr>
                  {tableHeader.map((header, index) => {
                    return (
                      <th key={`th-${index}`}>
                        {header === "Cliente" && (
                          <img
                            src={upDownArrowIcon}
                            alt="filter arrow icon"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              setOrderByClientName(
                                orderByClientName === "desc" ? "cres" : "desc"
                              )
                            }
                          />
                        )}
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {!isLoading &&
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
          {isLoading && <ClientsContentLoading />}
        </Row>
      </Container>
      <BillModal title="Cadastro" />
    </Container>
  );
}

export default Clientes;
