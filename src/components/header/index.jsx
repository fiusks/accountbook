import "./style.scss";
import arrowDownIcon from "../../assets/images/arrowdown.svg";
import HeaderDropDown from "../header-drop-down-menu";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserModal from "../modal-user/layout";
import ToastComponent from "../toast";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useAuth();
  const { setClientsFilters, clientsFilters, billsFilters, setBillsFilters } =
    useUser();
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const { showEditModal, showToast } = useUser();

  const name = userData && userData.name;

  const firstLetters =
    userData && name[0].toUpperCase() + name[2].toUpperCase();

  const currentLocation = location.pathname;

  if (location.pathname !== "/clientes") {
    if (clientsFilters.search || clientsFilters.status) {
      setClientsFilters({ status: "", search: "" });
    }
  }
  if (location.pathname !== "/cobrancas") {
    if (billsFilters.search || billsFilters.status) {
      setBillsFilters({ status: "", search: "" });
    }
  }

  return (
    <>
      <header className="header-container">
        {currentLocation === "/home" && <h1>Resumo das Cobranças</h1>}
        {currentLocation === "/clientes" && (
          <h2 className="header-navigation-link">Clientes</h2>
        )}
        {currentLocation === "/detalhesCliente" && (
          <h2 className="header-navigation-link">
            <span onClick={() => navigate("/clientes")}>Clientes</span>
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
          {openEditMenu && <HeaderDropDown setOpenEditMenu={setOpenEditMenu} />}
        </div>
      </header>
      <hr />
      {showEditModal && <UserModal />}

      {showToast && <ToastComponent />}
    </>
  );
}

export default Header;
