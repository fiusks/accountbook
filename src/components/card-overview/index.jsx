import "./style.scss";
import cobrancaPagaIcon from "../../assets/images/cobrancapagaicon.svg";
import cobrancaVencidaicon from "../../assets/images/cobrancavencidaicon.svg";
import cobrancaPrevistaIcon from "../../assets/images/cobrancaprevistaicon.svg";
import { Col } from "react-bootstrap";

function CardOverview({ cardType, value }) {
  const cards = [
    { name: "pagas", text: "Cobranças Pagas", icon: cobrancaPagaIcon },
    { name: "vencidas", text: "Cobranças Vencidas", icon: cobrancaVencidaicon },
    {
      name: "previstas",
      text: "Cobranças Previstas",
      icon: cobrancaPrevistaIcon,
    },
  ];
  function formatNumberToLocalCurrency(inputNumber) {
    const convertedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(inputNumber);
    return convertedValue;
  }
  const cardRender = cards.find((card) => card.name === cardType);
  return (
    <Col className={`card-overview ${cardRender.name} px-5`}>
      <img src={cardRender.icon} alt="icone de cobranca" />
      <div className="text-card-overview">
        <h3>{cardRender.text}</h3>
        <h2>{formatNumberToLocalCurrency(value)}</h2>
      </div>
    </Col>
  );
}

export default CardOverview;
