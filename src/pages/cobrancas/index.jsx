import "./style.scss";
import { Container, Form, Row, Col, FormGroup } from "react-bootstrap";
import { useState } from "react";
import FormExample from "../../components/novoModal/inedx";

function Cobrancas() {
  const [valor, setValor] = useState();
  return (
    <Container fluid>
      <FormExample />
    </Container>
  );
}

export default Cobrancas;
