import "./style.scss";
import cobrancaPagaIcon from "../../assets/images/cobrancapagaicon.svg";
import cobrancaVencidaicon from "../../assets/images/cobrancavencidaicon.svg";
import cobrancaPrevistaIcon from "../../assets/images/cobrancaprevistaicon.svg";

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
  const cardRender = cards.find((card) => card.name === cardType);
  return (
    <div className={`card-overview ${cardRender.name}`}>
      <img src={cardRender.icon} alt="icone de cobranca" />
      <div className="text-card-overview">
        <h3>{cardRender.text}</h3>
        <h3>{`R$ ${value}`}</h3>
      </div>
    </div>
  );
}

export default CardOverview;
