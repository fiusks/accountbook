import "./style.scss";
import { useState } from "react";
import clientIcon from "../../../assets/images/clientsIcon.svg";
import editIconGreen from "../../../assets/images/editIconGreen.svg";
import { Modal, Button } from "react-bootstrap";
import ClientForm from "../form";
import useUser from "../../../hooks/useUser";

function ClientModal({ type, client, loadClient }) {
  const [show, setShow] = useState(false);
  const { setClientForm } = useUser();

  const handleClose = () => {
    setShow(false);
    setClientForm({});
  };
  const handleShow = () => {
    setShow(true);
    if (type === "Editar") {
      setClientForm(client);
    }
  };

  return (
    <>
      <Button className="edit-button" variant="primary" onClick={handleShow}>
        {type === "Editar" ? (
          <img
            className="edit-icon"
            src={editIconGreen}
            alt="edit button icon"
          />
        ) : (
          "+ "
        )}
        {`${type} Cliente`}
      </Button>

      <Modal
        className="modal-backdrop-size"
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
          <ClientForm handleClose={handleClose} type={type} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ClientModal;
