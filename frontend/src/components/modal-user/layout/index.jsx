import "./style.scss";
import { Modal } from "react-bootstrap";
import UserForm from "../form";
import useUser from "../../../hooks/useUser";

function UserModal() {
  const { showEditModal, setShowEditModal } = useUser();
  return (
    <>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
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
        <Modal.Body className="edit-user-modal-body">
          <UserForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserModal;
