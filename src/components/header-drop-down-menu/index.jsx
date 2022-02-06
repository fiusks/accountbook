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
        <h5>Editar</h5>
      </div>
      <div className="drop-icons">
        <img src={logoutIcon} alt="edit icon" />
        <h5>Sair</h5>
      </div>
    </div>
  );
}

export default HeaderDropDown;
