import "./style.scss";
import notFoundPerson from "../../assets/images/notfoundPerson.svg";
import notFoundSearch from "../../assets/images/notfoundSearch.svg";
function NotFoundCard() {
  return (
    <div className="notFound">
      <div className="notFound-images-container">
        <img className="img-1" src={notFoundPerson} alt={"not found"} />
        <img src={notFoundSearch} alt={"not found"} />
      </div>
      <div className="text-notfound">
        <p className="text-1">Nenhum resultado foi encontrado</p>
        <p className="text-2">Verifique se a escrita está correta</p>
      </div>
    </div>
  );
}

export default NotFoundCard;
