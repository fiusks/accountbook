import "./style.scss";
import setaparabaixo from "../../assets/images/arrowdown.svg";

function Header() {
  return (
    <header>
      <h1>Resumo das Cobranças</h1>
      <div className="user-profile-container">
        <div className="image-profile">L R</div>
        <h2>Lorena</h2>
        <img src={setaparabaixo} alt="seta para baixo" />
      </div>
      <hr />
    </header>
  );
}

export default Header;
