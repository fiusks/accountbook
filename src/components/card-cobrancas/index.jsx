import "./style.scss";
import { Table, Col, Row, Badge } from "react-bootstrap";

function CardDeDados({ cardType }) {
  const clientesDB = [
    { nome: "Sara Silva", id: 223456787, valor: 1000 },
    { nome: "Carlos Prado", id: 223456781, valor: 400 },
    { nome: "lara Brito", id: 223456782, valor: 900 },
    { nome: "Soraia Neves", id: 223456783, valor: 700 },
    { nome: "Soraia Neves", id: 223456783, valor: 700 },
    { nome: "Soraia Neves", id: 223456783, valor: 700 },
  ];

  const cards = [
    { name: "pagas", text: "Cobranças Pagas" },
    { name: "vencidas", text: "Cobranças Vencidas" },
    { name: "previstas", text: "Cobranças Previstas" },
    { name: "inadimplente", text: "Clientes Inadimplentes" },
    { name: "em-dia", text: "Clientes em dia" },
  ];

  const cardRender = cards.find((card) => card.name === cardType);
  function formatNumberToLocalCurrency(inputNumber) {
    const convertedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputNumber);
    return convertedValue;
  }
  return (
    <Col className="card-container">
      <Row>
        <Col className="card-title">
          <h3>{cardRender.text}</h3>
          <h4 className={cardRender.name}>
            {String(clientesDB.length).padStart(2, "0")}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Id da cob.</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {clientesDB.slice(0, 4).map((cliente) => {
                return (
                  <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.id}</td>
                    <td>{formatNumberToLocalCurrency(cliente.valor)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card-cobranca-footer">Ver Todos</div>
        </Col>
      </Row>
    </Col>
  );
}

export default CardDeDados;
