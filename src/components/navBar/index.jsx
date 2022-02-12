import "./style.scss";
import homeicon from "../../assets/images/homeIcon.svg";
import cobrancaicon from "../../assets/images/cobrancaIcon.svg";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
function NavBar() {
  const menus = [
    {
      id: 0,
      src: homeicon,
      pagina: "home",
      nome: "Menu",
      alt: "home icon",
    },
    {
      id: 1,
      src: clientsIcon,
      pagina: "clientes",
      nome: "Clientes",
      alt: "clients icon",
    },
    {
      id: 2,
      src: cobrancaicon,
      pagina: "cobrancas",
      nome: "Cobranças",
      alt: "billing icon",
    },
  ];

  return (
    <Navbar className="navbar-container">
      <Nav className="flex-column w-100  navBar">
        <Nav.Link as={NavLink} to="home" className="mx-auto text-center">
          <img src={homeicon} alt="home icon" className="text-center" />
          <h3>Home</h3>
        </Nav.Link>
        <Nav.Link as={NavLink} to="clientes" className="mx-auto text-center">
          <img src={clientsIcon} alt="home icon" className="mx-auto" />
          <h3>Clientes</h3>
        </Nav.Link>
        <Nav.Link as={NavLink} to="cobrancas" className=" mx-auto text-center">
          <img src={cobrancaicon} alt="home icon" className="" />
          <h3>Cobranças</h3>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
