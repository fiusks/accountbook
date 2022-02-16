import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import cobrancas from "../../assets/images/cobrancas.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import { SearchInput } from "../../components/input-generic";
import "./style.scss";

function Cobrancas() {
  const [valor, setValor] = useState();

  const tableHeader = [
    "Cliente",
    "ID Cob.",
    "Valor",
    "Data de Venc.",
    "Status ",
    "Descrição",
  ];




  






  return (
    <Container fluid >
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
            <Table responsive className="table-hover" >
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
                </tr>
              </thead>
              <tbody>

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>






  )

}

export default Cobrancas;
