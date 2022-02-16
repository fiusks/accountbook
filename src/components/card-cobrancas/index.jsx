import "./style.scss";
import { Table, Col, Row } from "react-bootstrap";
import useUser from "../../hooks/useUser";


function CardDeDados({ cardType, dataDoHome}) {
  
  const { homeData } = useUser();
  const { 
    paidBills, 
    unpaidBills, 
    overdueBills, 
    overdueClients, 
    ondueClients, 
    quantityOverdueClients, 
    quantityOndueClients, 
    quantityOverdueBills, 
    quantityPaidBills, 
    quantityUnpaidBills 
  } = homeData;
  const cards = [
    { name: "pagas", text: "Cobranças Pagas", data: paidBills, quantity: quantityPaidBills },
    { name: "vencidas", text: "Cobranças Vencidas", data: overdueBills, quantity: quantityOverdueBills },
    { name: "previstas", text: "Cobranças Previstas", data: unpaidBills, quantity: quantityUnpaidBills },
    { name: "inadimplente", text: "Clientes Inadimplentes", data: overdueClients, quantity: quantityOverdueClients },
    { name: "em-dia", text: "Clientes em dia", data: ondueClients, quantity: quantityOndueClients },
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
            {cardRender.quantity}
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
              {cardRender.data.map((client) => {
                return (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.id}</td>
                    <td>{formatNumberToLocalCurrency(client.amount)}</td>
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
