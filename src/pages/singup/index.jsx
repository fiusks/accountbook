import { useRef, useState } from "react";
import select from "../../assets/screen-select.svg";
import selected from "../../assets/screen-selected.svg";
import CardSingup from "../../components/cardSingupComponent";
import { InputSenha } from "../../components/inputs";
import ProgressBar from "../../components/progressComponent";
import "./style.scss";

function Singup() {
  const [inputPassword, setInputPassword] = useState("");
  const [inputRePassword, setInputRePassword] = useState("");
  const refPass = useRef();
  const refRePass = useRef();

  return (
    <div className="singup">
      <ProgressBar></ProgressBar>
      <div className="singup-section">
        <CardSingup
          refPass={refPass}
          refRePass={refRePass}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          inputRePassword={inputRePassword}
          setInputRePassword={setInputRePassword}
        >
          <InputSenha
            inputState={inputPassword}
            setInputState={setInputPassword}
            innerRef={refPass}
            title="senha"
          />
          <InputSenha
            inputState={inputRePassword}
            setInputState={setInputRePassword}
            innerRef={refRePass}
            title="repetir senha"
          />
        </CardSingup>
        <div className="nav">
          <img src={selected} alt="" />
          <img src={select} alt="" />
          <img src={select} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Singup;
