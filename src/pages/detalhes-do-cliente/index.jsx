import "./style.scss";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import editIcon from "../../assets/images/editicon.svg";

import addIcon from "../../assets/images/addIcon.svg";
import arrowUpDown from "../../assets/images/arrowupdown.svg";
import deleteIconRed from "../../assets/images/deleteIconRed.svg";
import { Container, Row, Col, Table } from "react-bootstrap";
import ClientModal from "../../components/client-modal/layout";
function ClientsDetails() {
  const clientDataFields = ["E-mail", "Telefone", "CPF"];
  const addressDataFields = [
    "Endereço",
    "Bairro",
    "Complement",
    "CEP",
    "Cidade",
    "UF",
  ];
  const tableHeaders = [
    "ID Cobrança",
    "Data de Vencimento",
    "Valor",
    "Status",
    "Descrição",
  ];

  return (
    <Container fluid>
      <Row className="w-100 client-page-container">
        <Col>
          <Row>
            <Col>
              <img src={clientsIcon} alt="" />
              <h1>Sara Lage Silva</h1>
            </Col>
          </Row>
          <Row className="client-data-container">
            <Col>
              <Row>
                <Col className="client-detail-header">
                  <h3>Dados do cliente</h3>
                  <ClientModal type="Editar" />
                </Col>
              </Row>
              <Row className="">
                <Col>
                  <h5>Telefone*</h5>
                  <h6>71 9 9462 8654</h6>
                </Col>

                <Col>
                  <h5>CPF</h5>
                  <h6>054 365 255 87</h6>
                </Col>

                <Col>
                  <h5>Endereço*</h5>
                  <h6>Rua das Cornélias; nº 512</h6>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h5>Bairro</h5>
                  <h6>Oliveiras</h6>
                </Col>
                <Col>
                  <h5>Complemento</h5>
                  <h6>Ap: 502</h6>
                </Col>
                <Col>
                  <h5>CEP</h5>
                  <h6>031 654 524 04</h6>
                </Col>
                <Col>
                  <h5>Cidade</h5>
                  <h6>Salvador</h6>
                </Col>
                <Col>
                  <h5>UF</h5>
                  <h6>BA</h6>
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
                              {header !== "Descrição" && (
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
                  </Table>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientsDetails;

{
  /* <Row>
  <Col>
    <h3>Cobranças do Cliente</h3>
    <button>
      <img src={addIcon} alt="" />
      Nova cobrança
    </button>
  </Col>
</Row> */
}
