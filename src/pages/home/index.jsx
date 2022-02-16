import "./style.scss";
import CardOverview from "../../components/card-overview";
import CardDeDados from "../../components/card-cobrancas";
import { Container, Row, Col } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import useUser from "../../hooks/useUser"
function Home() {
  const {setHomeData} = useUser()
  const[data, setData] = useState()
  const {token} = useAuth();

  useEffect(() => {
    async function getHomeData() {
      const response = await fetch('http://localhost:3001/listHome', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`
        }
      });
  
      const dataFromListHome = await response.json();
      
      const {client} = dataFromListHome;
      
      setData(client)
    };
    getHomeData()
  }, [])

  
  if (data) {
    setHomeData(data)
  }
  
  return (
    <Container fluid>
      <Row className="cards-overview-container mt-4">
        <CardOverview key="resumo pagas" cardType="pagas" value="30000" />
        <CardOverview key="resumo vencidas" cardType="vencidas" value="30000" />
        <CardOverview
          key="resumo previstas"
          cardType="previstas"
          value="50"
        />
      </Row>
      <Row className="cards-cobranca-container">
        <CardDeDados cardType="pagas" dataDoHome={data}/>
        <CardDeDados cardType="vencidas" dataDoHome={data}/>
        <CardDeDados cardType="previstas" dataDoHome={data}/>
      </Row>
      <Row className="cards-status-container">
        <CardDeDados cardType="em-dia" dataDoHome={data}/>
        <CardDeDados cardType="inadimplente" dataDoHome={data}/>
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
