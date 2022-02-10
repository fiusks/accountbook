import "./style.scss";
import arrowDownIcon from "../../assets/images/arrowdown.svg";
import HeaderDropDown from "../header-drop-down-menu";
import useUser from "../../hooks/useUser";
import UserModal from "../modal-user";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { userData } = useAuth();
  const { openEditMenu, setOpenEditMenu } = useUser();
  const nome = userData.name;

  const firstLetters = nome[0].toUpperCase() + nome[2].toUpperCase();
  
  const currentLocation = location.pathname.split("/")[2];

  
  // const firstLetters =
  //   nome.[charAt(0)].toLocaleUpperCase() +
  //   nome.split(" ")[1].charAt(0).toLocaleUpperCase();

  return (
    <header>
      <div className="header-container">
        {currentLocation === "home" && <h1>Resumo das Cobranças</h1>}
        {currentLocation === "clientes" && <h2 className="greenSmallName">Clientes</h2>}
        {currentLocation === "cobrancas" && <h2 className="greenSmallName" >Cobranças</h2>}
        <div className="user-profile-container">
          <h2 className="image-profile">{firstLetters}</h2>
          <h3>{nome}</h3>
          <img
            src={arrowDownIcon}
            alt="seta para baixo"
            onClick={() => setOpenEditMenu(!openEditMenu)}
          />
          {openEditMenu && <HeaderDropDown />}
        </div>
      </div>
      <hr />
      <UserModal />
    </header>
  );
}

export default Header;
