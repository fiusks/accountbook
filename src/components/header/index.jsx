import "./style.scss";
import arrowDownIcon from "../../assets/images/arrowdown.svg";
import HeaderDropDown from "../header-drop-down-menu";
import useUser from "../../hooks/useUser";

function Header() {
  const { openEditMenu, setOpenEditMenu } = useUser();
  const nome = "Rafael Barros";

  const firstLetters =
    nome.charAt(0).toLocaleUpperCase() +
    " " +
    nome.split(" ")[1].charAt(0).toLocaleUpperCase();
  return (
    <header>
      <div className="header-container">
        <h1>Resumo das Cobranças</h1>
        <div className="user-profile-container">
          <div className="image-profile">{firstLetters}</div>
          <h2>{nome.split(" ")[0]}</h2>
          <img
            src={arrowDownIcon}
            alt="seta para baixo"
            onClick={() => setOpenEditMenu(!openEditMenu)}
          />
          {openEditMenu && <HeaderDropDown />}
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;
