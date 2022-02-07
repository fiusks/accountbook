import "./style.scss";
import editIcon from "../../assets/images/editicon.svg";
import logoutIcon from "../../assets/images/logouticon.svg";
import arrowDropMenuIcon from "../../assets/images/arrowdropmenu.svg";
import useUser from "../../hooks/useUser";

function HeaderDropDown() {
  const { setOpenModal, setOpenEditMenu } = useUser();

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
      <div className="drop-icons">
        <img src={logoutIcon} alt="edit icon" />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default HeaderDropDown;
