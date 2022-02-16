import "./style.scss";
import { useState } from "react";
import clientIcon from "../../../assets/images/clientsIcon.svg";
import editIconGreen from "../../../assets/images/editIconGreen.svg";
import { Modal, Button } from "react-bootstrap";
import ClientForm from "../form";

function ClientModal({ type }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="edit-button" variant="primary" onClick={handleShow}>
        {type === "Editar" ? (
          <img
            className="edit-icon"
            src={editIconGreen}
            alc="edit button icon"
          />
        ) : (
          "+ "
        )}
        {`${type} Cliente`}
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
            <span>{`${type} Cliente`}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ClientModal;
