import "./style.scss";
import NavBar from "../navBar";
import { Outlet } from "react-router-dom";
import Header from "../header";
import { UserProvider } from "../../contexts/UserContext";
import ToastComponent from "../toast";
import useUser from "../../hooks/useUser";
import { Container, Row, Col } from "react-bootstrap";

function Layout() {
  const { clientToast } = useUser();
  return (
    <UserProvider>
      <Container fluid className="app-background">
        <Row className="app-overall-size">
          <Col sm={1} className="navBar-container pt-5 px-0">
            <NavBar />
          </Col>
          <Col sm={11} className="p-0">
            <Container
              fluid
              className="pt-5 px-5"
              style={{ background: "#E5E5E5" }}
            >
              <Row className="pt-5 px-5">
                <Col>
                  <Header />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Outlet />
                  {clientToast && <ToastComponent />}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}

export default Layout;
