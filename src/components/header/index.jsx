import "./style.scss";
import arrowDownIcon from "../../assets/images/arrowdown.svg";
import HeaderDropDown from "../header-drop-down-menu";
import useUser from "../../hooks/useUser";
import UserModal from "../modal-user/layout";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useAuth();
  const { openEditMenu, setOpenEditMenu } = useUser();
  const name = userData && userData.name;

  const firstLetters = userData && name[0].toUpperCase() + name[2].toUpperCase();

  const currentLocation = location.pathname;

  return (
    <>
      <header className="header-container">
        {currentLocation === "/home" && <h1>Resumo das Cobranças</h1>}
        {currentLocation === "/clientes" && (
          <h2 className="header-navigation-link">Clientes</h2>
        )}
        {currentLocation === "/detalhesCliente" && (
          <h2 className="header-navigation-link">
            <span onClick={() => navigate("/clientes")}>
              Clientes
            </span>
            <span className="second-navigate-link"> Detalhes do Cliente</span>
          </h2>
        )}
        {currentLocation === "/cobrancas" && (
          <h2 className="header-navigation-link">Cobranças</h2>
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
