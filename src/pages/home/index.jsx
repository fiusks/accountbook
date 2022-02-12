import "./style.scss";
import CardOverview from "../../components/card-overview";
import CardDeDados from "../../components/card-cobrancas";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <Container fluid>
      <Row className="cards-overview-container mt-4">
        <CardOverview key="resumo pagas" cardType="pagas" value="30000" />
        <CardOverview key="resumo vencidas" cardType="vencidas" value="30000" />
        <CardOverview
          key="resumo previstas"
          cardType="previstas"
          value="30000"
        />
      </Row>
      <Row className="cards-cobranca-container">
        <CardDeDados cardType="pagas" />
        <CardDeDados cardType="vencidas" />
        <CardDeDados cardType="previstas" />
      </Row>
      <Row className="cards-status-container">
        <CardDeDados cardType="em-dia" />
        <CardDeDados cardType="inadimplente" />
      </Row>
    </Container>
  );
}

export default Home;

{
  /* <div className="cards-overview-container">
        
        
        
</div>
<div className="cards-cobranca-container">
  
  
  
</div>
<div className="cards-clientes-container">
  
  
</div> */
}
