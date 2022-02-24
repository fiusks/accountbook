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
import ToastComponent from "../../components/toast";
<<<<<<< HEAD
import { DeleteBillModal } from "../../components/deleteBillModal/index";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 65e76fd1f37b2263442e23b334749e4b6267373a

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

  const {
    clientDetail,
    setOpenBillModal,
    update,
    submitClientForm,
    clientToast,
    setType,
    inputForms,
<<<<<<< HEAD
    deleteBill,
=======
    setInputForms,
>>>>>>> 65e76fd1f37b2263442e23b334749e4b6267373a
  } = useUser();
  const [client, setClient] = useState({});
  const navigate = useNavigate();
  function handleShow(type, bill) {
    console.log(bill, "bill");
    setType(type);
    setInputForms({
      name: bill.name,
      desc: bill.description,
      dueDate: bill.due_date,
      amount: bill.amount,
      clientId: bill.client_id,
      status: bill.bill_status,
    });

    setOpenBillModal(true);
  }
  const token = document.cookie.split("=")[1];
  console.log(document.cookie.split("="));

  useEffect(() => {
    if (!clientDetail.id) {
      navigate("/clientes");
    }
    loadClient();
  }, [update, submitClientForm, deleteBill]);
  async function loadClient() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}getClients/${clientDetail.id}`,
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

  function populateBills(bills) {
    return bills.map((bill) => {
      return (
<<<<<<< HEAD
        <>
          <tr key={bill.id}>
            <td>{bill.id}</td>
            <td>
              {new Intl.DateTimeFormat("pt-BR").format(Date.parse(bill.due_date))}
            </td>
            <td>{bill.amount}</td>
            <td>{bill.bill_status === "pending" ? "Pendente" : "Pago"}</td>
            <td>{bill.description}</td>
            <td>
              <img
                key={`edit-${bill.id}`}
                src={editIcon}
                onClick={() => {
                  findDetails(bill.id);
                  handleShow("/editBill");
                }}
                alt="edit icon"
              />
            </td>
            <td>
              <img
                key={`delete-${bill.id}`}
                src={deleteIconRed}
                alt="delete icon"
                onClick={DeleteBillModal.deleteBill}
              />
            </td>
          </tr>
          <DeleteBillModal.DeleteBill status={bill.bill_status} dataVencimento={bill.due_date} cobrancaId={bill.id} />
        </>
=======
        <tr key={bill.id}>
          <td>{bill.id}</td>
          <td>
            {new Intl.DateTimeFormat("pt-BR").format(Date.parse(bill.due_date))}
          </td>
          <td>{bill.amount}</td>
          <td>{bill.bill_status === "pending" ? "Pendente" : "Pago"}</td>
          <td>{bill.description}</td>
          <td>
            <img
              key={`edit-${bill.id}`}
              src={editIcon}
              onClick={() => {
                handleShow("/editBill", bill);
              }}
              alt="edit icon"
            />
          </td>
          <td>
            <img
              key={`delete-${bill.id}`}
              src={deleteIconRed}
              alt="delete icon"
            />
          </td>
        </tr>
>>>>>>> 65e76fd1f37b2263442e23b334749e4b6267373a
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
                  <h3>Cobranças do Cliente</h3>
                  <Button
                    className="add-button"
                    variant="secondary"
                    onClick={() =>
                      handleShow("/registerBill", {
                        name: clientDetail.name,
                        description: "",
                        due_date: "",
                        amount: "",
                        bill_status: "pending",
                        client_id: clientDetail.id,
                      })
                    }
                  >
                    + Nova cobrança
                  </Button>
                  <BillModal />
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
<<<<<<< HEAD
      {clientToast && <ToastComponent />}
      <DeleteBillModal.DeleteBillSucess />
      <DeleteBillModal.DeleteBillFail />
=======
>>>>>>> 65e76fd1f37b2263442e23b334749e4b6267373a
    </Container>
  );
}

export default ClientsDetails;
