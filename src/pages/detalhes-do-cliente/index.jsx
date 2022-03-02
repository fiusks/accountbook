import "./style.scss";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import editIcon from "../../assets/images/editicon.svg";
import arrowUpDown from "../../assets/images/arrowupdown.svg";
import deleteIconRed from "../../assets/images/deleteIconRed.svg";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import ClientModal from "../../components/client-modal/layout";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { formatCPF, formatCEP, formatPhone } from "../../services/formatData";
import BillModal from "../../components/billModall/layout";
import DeleteBill from "../../components/deleteBillModal/DeleteBill";
import { useNavigate } from "react-router-dom";
import { formatDate, formatToCurrency } from "../../services/formatData";
import BillDetails from "../../components/billDetailsModal";

function ClientsDetails() {
  const [billToDelete, setBillToDelete] = useState({});

  const tableHeaders = [
    "ID Cobrança",
    "Data de Vencimento",
    "Valor",
    "Status",
    "Descrição",
    "",
    "",
  ];

  const {
    clientDetail,
    setOpenBillModal,
    update,
    submitClientForm,
    setType,
    setInputForms,
    deleteBill,
    findDetails,
    inputForms,
    setShowDeleteBillModal,
    showDeleteBillModal,
    clientDetailsLocal,
    setToastType,
    setToastMessage,
    setShowToast,
    billDetails,
    setBillDetails,
    showBillDetail,
    setShowBillDetail,
  } = useUser();
  const [client, setClient] = useState({});
  const navigate = useNavigate();

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

  function handleShow(type, bill) {
    const editBills = {
      clientId: clientDetailsLocal.clientId,
      name: clientDetailsLocal.clientName,
      desc: bill.description,
      dueDate: bill.due_date.substr(0, 10),
      amount: bill.amount,
      status: bill.bill_status,
      id: bill.id,
    };
    setType(type);
    setInputForms(editBills);
    setOpenBillModal(true);
  }
  const token = document.cookie.split("=")[1];

  useEffect(() => {
    if (!clientDetailsLocal) {
      navigate("/clientes");
    }
    loadClient();
  }, [update, submitClientForm, deleteBill]);
  async function loadClient() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}getClient/${clientDetailsLocal.clientId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
        console.log(data);
      setClient(data.client);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClickLixeira(event, billDelete) {
    if (
      billToDelete.status !== "pending" &&
      new Date(billToDelete.due_date) < new Date()
    ) {
      setToastType("failed");
      setToastMessage("Esta cobrança não pode ser excluída!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return;
    }

    setShowDeleteBillModal(true);
    setBillToDelete(billDelete);
    event.stopPropagation();
  }

  function handleBillDetails(thisBill) {
    setBillDetails(thisBill);
    setShowBillDetail(true);

  }

  function populateBills(bills) {
    return bills.map((bill) => {
      return (
        <tr  onClick={() => handleBillDetails(bill)} key={bill.id}>
          <td>{bill.id}</td>
          <td>
            {formatDate(bill.due_date)}
          </td>
          <td>{bill.amount}</td>
          <td>
            <span className={formatBillStatus(bill.bill_status).toLowerCase()}>
              {formatBillStatus(bill.bill_status)}
            </span>
          </td>
          <td>{bill.description}</td>
          <td>
            <img
              key={`edit-${bill.id}`}
              src={editIcon}
              onClick={() => {
                handleShow("editBill", bill);
              }}
              alt="edit icon"
            />
          </td>
          <td>
            <img
              key={`delete-${bill.id}`}
              src={deleteIconRed}
              alt="delete icon"
              onClick={(event) => handleClickLixeira(event, bill)}
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
              <Row className="mb-4">
                <Col className="client-detail-header">
                  <h3>Dados do cliente</h3>
                  <ClientModal type="Editar" client={client} />
                </Col>
              </Row>
              <Row className="mb-5">
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

              <Row className="mb-5">
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
                  <h3>Cobranças do Cliente</h3>
                  <Button
                    className="add-button"
                    variant="secondary"
                    onClick={() =>
                      handleShow("registerBill", {
                        description: "",
                        due_date: "",
                        amount: "",
                        bill_status: "pending",
                      })
                    }
                  >
                    + Nova cobrança
                  </Button>
                  <BillModal title="Edição" />
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
        </Col>
      </Row>
      {showBillDetail && <BillDetails
        nome={billDetails.name}
        descricao={billDetails.description}
        dataVencimento={formatDate(billDetails.due_date)}
        valor={formatToCurrency(billDetails.amount)}
        idCobranca={billDetails.id}
        status={formatBillStatus(billDetails.bill_status)}
      />}

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

export default ClientsDetails;
