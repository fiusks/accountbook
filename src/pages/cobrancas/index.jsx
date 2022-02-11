import "./style.scss";
import { Container, Form, Row, Col, FormGroup } from "react-bootstrap";
import { useState } from "react";

function Cobrancas() {
  const [valor, setValor] = useState();
  return (
    <Container fluid>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="text"
              placeholder="Digite seu nome"
            />
            <Form.Text className="text-muted">{valor}</Form.Text>
          </Form.Group>
          <FormGroup>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              type="text"
              placeholder="Digite seu nome"
            />
            <Form.Text className="text-muted">{valor}</Form.Text>
          </FormGroup>
        </Row>
        <Form.Group className="mb-1" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Digite o seu e-mail" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-1" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Digite o seu e-mail" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Cobrancas;
