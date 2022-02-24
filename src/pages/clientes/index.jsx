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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCPF, formatPhone } from "../../services/formatData";
import { FilterBox } from "../../components/filter-box/index";

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
    inputForms,
    setInputForms,
    setType,
    clientsFilters, 
    setClientsFilters, 
    homeData
  } = useUser();


  const handleShowBill = () => setOpenBillModal(true);
  const token = document.cookie.split("=")[1];
  const [tableClients, setTableClients] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getClientList();
  }, [submitClientForm]);
  
  
  async function getClientList() {
    try {
      if (clientsFilters?.status){
        if (clientsFilters.status === 'em-dia'){
          setTableClients(homeData.ondueClients)
          setClientsFilters({})
          return
        } else if (clientsFilters.status === 'inadimplente') {
          setTableClients(homeData.overdueClients)
          setClientsFilters({})
          return
        }
      
  
        const response = await fetch(`https://api-testes-equipe-06.herokuapp.com/${clientsFilters.search || clientsFilters.status? "listFilteredClients": "listClients"}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      } else {

        const response = await fetch(
           `https://api-testes-equipe-06.herokuapp.com/listClients`,
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  function findDetails(clientId) {
    const clientSelected = tableClients.find(
      (client) => client.id === clientId
    );
    console.log(clientSelected);
    setClientDetail(clientSelected);
    setInputForms({ ...inputForms, name: clientSelected.name });
  }
  function handleClientDetails(clientId) {
    findDetails(clientId);
    navigate("/detalhesCliente");
  }
  function handleKeyUp(event) {
    if (event.which === 13 && activeSearch) {
      getClientList();
      setActiveSearch(false);
    }
  }
  function handleSearchChange(event) {
    setClientsFilters((preivousState) => ({
      ...preivousState,
      search: event.target.value,
    }));
    setActiveSearch(true);
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
          <img src={filterButton} alt="settings icon" className="icon-input" />
          <SearchInput />
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
                {tableClients.map((client) => {
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
                            findDetails(client.id);
                            setType("/registerBill");
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
          </Col>
        </Row>
      </Container>
      <BillModal />
      {clientToast && <ToastComponent />}
    </Container>
  );
}

export default Clientes;
