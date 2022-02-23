import "./style.scss";
import { Table, Col, Row } from "react-bootstrap";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function CardDeDados({ cardType }) {
  const { homeData } = useUser();
  const navigate = useNavigate()
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
    quantityUnpaidBills,
  } = homeData;

  const cards = [
    {
      name: "pagas",
      text: "Cobranças Pagas",
      data: paidBills.slice(0, 4),
      quantity: quantityPaidBills,
      type: "bill",
    },
    {
      name: "vencidas",
      text: "Cobranças Vencidas",
      data: overdueBills.slice(0, 4),
      quantity: quantityOverdueBills,
      type: "bill",
    },
    {
      name: "previstas",
      text: "Cobranças Previstas",
      data: unpaidBills.slice(0, 4),
      quantity: quantityUnpaidBills,
      type: "bill",
    },
    {
      name: "inadimplente",
      text: "Clientes Inadimplentes",
      data: overdueClients.slice(0, 4),
      quantity: quantityOverdueClients,
      type: "client",
    },
    {
      name: "em-dia",
      text: "Clientes em dia",
      data: ondueClients.slice(0, 4),
      quantity: quantityOndueClients,
      type: "client",
    },
  ];

  const cardRender = cards.find((card) => card.name === cardType);

  function formatNumberToLocalCurrency(inputNumber) {
    const convertedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputNumber);
    return convertedValue;
  }
  function formatCPF(string) {
    if (string) {
      const formatCPFNumber = string.split("");
      return `${formatCPFNumber[0]}${formatCPFNumber[1]}${formatCPFNumber[2]}.${formatCPFNumber[3]}${formatCPFNumber[4]}${formatCPFNumber[5]}.${formatCPFNumber[6]}${formatCPFNumber[7]}${formatCPFNumber[8]}-${formatCPFNumber[9]}${formatCPFNumber[10]}`;
    }
  }

  function callMap(cardRender) {
    if (cardRender.type === "bill") {
      return cardRender.data.map((client) => {
        return (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.id}</td>
            <td>{formatNumberToLocalCurrency(client.amount)}</td>
          </tr>
        );
      });
    } else {
      return cardRender.data.map((client) => {
        return (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.id}</td>
            <td>{formatCPF(client.cpf)}</td>
          </tr>
        );
      });
    }
  }

  return (
    <Col className="card-container">
      <Row>
        <Col className="card-title">
          <h3>{cardRender.text}</h3>
          <h4 className={cardRender.name}>{cardRender.quantity}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>{"ID"}</th>
                <th>{cardRender.type === "bill" ? "Valor" : "CPF"}</th>
              </tr>
            </thead>
            <tbody>{cardRender.data ? callMap(cardRender) : ""}</tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card-cobranca-footer">
            <p onClick={() => {cardRender.type === "bill"? navigate("/cobrancas"):navigate("/clientes")}}>
              Ver Todos
            </p>
            
            </div>
        </Col>
      </Row>
    </Col>
  );
}

export default CardDeDados;
