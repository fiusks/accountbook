import { useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
function BillingModal() {
  const [show, setShow] = useState(false);
  return (
    <div className="billingModal">
      <div className="header"></div>
      <div className="form"></div>
      <div
        className="buttons"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Button className="btn btn-cancel" style={{ padding: "0rem 2rem" }}>
          Cancelar
        </Button>
        <Button className="btn btn-confirm" style={{ padding: "0rem 2rem" }}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}

export default BillingModal;
