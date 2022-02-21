import "./style.scss";
import CardOverview from "../../components/card-overview";
import CardDeDados from "../../components/card-cobrancas";
import { Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

function Home() {
  const { setHomeData, homeData } = useUser();
  const { totalAmountPaid, totalAmountUnpaid, totalAmountOverdue } = homeData;
  const [data, setData] = useState();
  const token = document.cookie.split("=")[1];

 
  useEffect(() => {
    async function getHomeData() {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/listHome`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const dataFromListHome = await response.json();

      const { client } = dataFromListHome;

      setData(client);
    }
    getHomeData();
  }, []);

  if (data) {
    setHomeData(data);
  }

  return (
    <Container fluid>
      <Row className="cards-overview-container mt-4">
        <CardOverview
          key="resumo pagas"
          cardType="pagas"
          value={`${totalAmountPaid}`}
        />
        <CardOverview
          key="resumo vencidas"
          cardType="vencidas"
          value={`${totalAmountOverdue}`}
        />
        <CardOverview
          key="resumo previstas"
          cardType="previstas"
          value={`${totalAmountUnpaid}`}
        />
      </Row>
      <Row className="cards-cobranca-container">
        <CardDeDados cardType="pagas" dataDoHome={data} />
        <CardDeDados cardType="vencidas" dataDoHome={data} />
        <CardDeDados cardType="previstas" dataDoHome={data} />
      </Row>
      <Row className="cards-status-container">
        <CardDeDados cardType="em-dia" dataDoHome={data} />
        <CardDeDados cardType="inadimplente" dataDoHome={data} />
      </Row>
    </Container>
  );
}

export default Home;
