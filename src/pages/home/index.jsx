import "./style.scss";
import CardOverview from "../../components/card-overview";
import CardDeDados from "../../components/card-cobrancas";
import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

function Home() {
  const { setHomeData, homeData } = useUser();
  const { totalAmountPaid, totalAmountUnpaid, totalAmountOverdue } = homeData;
  const [data, setData] = useState();
  const token = document.cookie.split("=")[1];
  console.log(document.cookie.split("="));

  useEffect(() => {
    async function getHomeData() {
      const response = await fetch(
        `https://api-testes-equipe-06.herokuapp.com/listHome`,
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
          value={`${totalAmountPaid ? totalAmountPaid : 0}`}
        />
        <CardOverview
          key="resumo vencidas"
          cardType="vencidas"
          value={`${totalAmountOverdue ? totalAmountOverdue : 0}`}
        />
        <CardOverview
          key="resumo previstas"
          cardType="previstas"
          value={`${totalAmountUnpaid ? totalAmountUnpaid : 0}`}
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
