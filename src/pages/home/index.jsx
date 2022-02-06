import "./style.scss";
import CardOverview from "../../components/card-overview";
import CardDeDados from "../../components/card-cobrancas";

function Home() {
  return (
    <div className="home-container">
      <div className="cards-overview-container">
        <CardOverview key="resumo pagas" cardType="pagas" value="30000" />
        <CardOverview key="resumo vencidas" cardType="vencidas" value="30000" />
        <CardOverview
          key="resumo previstas"
          cardType="previstas"
          value="30000"
        />
      </div>
      <div className="cards-cobranca-container">
        <CardDeDados cardType="pagas" />
        <CardDeDados cardType="vencidas" />
        <CardDeDados cardType="previstas" />
      </div>
      <div className="cards-clientes-container">
        <CardDeDados cardType="inadimplente" />
        <CardDeDados cardType="em-dia" />
      </div>
    </div>
  );
}

export default Home;
