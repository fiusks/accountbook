import "./style.scss";
import homeicon from "../../assets/images/homeIcon.svg";
import cobrancaicon from "../../assets/images/cobrancaIcon.svg";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
    <nav key="navContainer" className="nav-container">
      {menus.map((menu) => {
        return (
          <NavLink key={menu.pagina} className="nav-link" to={menu.pagina}>
            <img src={menu.src} alt={menu.alt} />
            <hr />
            <span>{menu.nome}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavBar;
