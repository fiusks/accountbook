import "./style.scss";
import { Modal } from "react-bootstrap";
import UserForm from "../form";
import useUser from "../../../hooks/useUser";

function UserModal() {
  const handleClose = () => setOpenModal(false);
  const { openModal, setOpenModal } = useUser();
  return (
    <>
      <Modal
        show={openModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-user-edit-container justify-content-center"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-user-edit-title">
            <h2>Edite seu cadastro</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserModal;
