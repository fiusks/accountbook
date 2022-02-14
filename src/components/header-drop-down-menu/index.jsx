import "./style.scss";
import editIcon from "../../assets/images/editicon.svg";
import logoutIcon from "../../assets/images/logouticon.svg";
import arrowDropMenuIcon from "../../assets/images/arrowdropmenu.svg";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function HeaderDropDown() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setToken } = useAuth();
  const { setOpenModal, setOpenEditMenu } = useUser();

  function handleLogout() {
    setToken("");
    setIsAuthenticated(false);
    navigate("/login");
  }

  function handleOpenModal() {
    setOpenModal(true);
    setOpenEditMenu(false);
  }
  return (
    <Container className="edit-menu-container">
      <img
        className="arrow-drop-menu"
        src={arrowDropMenuIcon}
        alt="arrow drop menu icon"
      />
      <Row className="icons-edit-container">
        <Col className="icons-edit-menu" onClick={handleOpenModal}>
          <img src={editIcon} alt="edit icon" />
          <span>Editar</span>
        </Col>
        <Col className="icons-edit-menu" onClick={handleLogout}>
          <img src={logoutIcon} alt="edit icon" />
          <span>Sair</span>
        </Col>
      </Row>
    </Container>
  );
}

export default HeaderDropDown;
