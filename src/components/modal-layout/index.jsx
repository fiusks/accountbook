import "./style.scss";
import { useState } from "react";
import clientIcon from "../../assets/images/clientsIcon.svg";
import { Modal, Button } from "react-bootstrap";
import FormExample from "../novoModal/inedx";

function ModalLayout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Adicionar Cliente
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="flex-row">
            <img src={clientIcon} alt="client icon" />
            <span>Cadastro do Cliente</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormExample handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalLayout;
