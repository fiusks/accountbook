import "./style.scss";
import editIcon from "../../assets/images/editicon.svg";
import logoutIcon from "../../assets/images/logouticon.svg";
import arrowDropMenuIcon from "../../assets/images/arrowdropmenu.svg";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"

function HeaderDropDown() {
  const navigate = useNavigate();
  const {setIsAuthenticated , setToken} = useAuth();
  const { setOpenModal, setOpenEditMenu } = useUser();

  function handleExit() {
    setToken('');
    setIsAuthenticated(false);
    navigate('/login');
  }

  function handleEditClick() {
    setOpenModal(true);
    setOpenEditMenu(false);
  }
  return (
    <div className="drop-edit-menu">
      <img
        className="arrow-drop-menu"
        src={arrowDropMenuIcon}
        alt="arrow drop menu icon"
      />
      <div className="drop-icons" onClick={() => handleEditClick()}>
        <img src={editIcon} alt="edit icon" />
        <span>Editar</span>
      </div>
      <div className="drop-icons" onClick={() => handleExit()}>
        <img src={logoutIcon} alt="edit icon" />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default HeaderDropDown;
