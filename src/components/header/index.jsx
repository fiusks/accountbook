import "./style.scss";
import arrowDownIcon from "../../assets/images/arrowdown.svg";
import HeaderDropDown from "../header-drop-down-menu";
import useUser from "../../hooks/useUser";
import UserModal from "../modal-user/layout";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const { userData } = useAuth();
  const { openEditMenu, setOpenEditMenu } = useUser();
  const name = userData.name;

  const firstLetters = name[0].toUpperCase() + name[2].toUpperCase();

  const currentLocation = location.pathname.split("/")[2];

  return (
    <>
      <header className="header-container">
        {currentLocation === "home" && <h1>Resumo das Cobranças</h1>}
        {currentLocation === "clientes" && (
          <h2 className="greenSmallName">Clientes</h2>
        )}
        {currentLocation === "cobrancas" && (
          <h2 className="greenSmallName">Cobranças</h2>
        )}

        <div className="user-profile-container ">
          <h2 className="image-profile">{firstLetters}</h2>
          <h3>{name}</h3>
          <img
            src={arrowDownIcon}
            alt="seta para baixo"
            onClick={() => setOpenEditMenu(!openEditMenu)}
          />
          {openEditMenu && <HeaderDropDown />}
        </div>
      </header>
      <hr />
      <UserModal />
    </>
  );
}

export default Header;
