import "./style.scss";
import { Modal } from "react-bootstrap";
import BillForm from "../form";
import billIcon from "../../../assets/images/cobrancaIcon.svg";
import useUser from "../../../hooks/useUser";

function BillModal() {
  const { openBillModal, setOpenBillModal } = useUser();

  const handleClose = () => setOpenBillModal(false);

  return (
    <>
      <Modal
        show={openBillModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="flex-row">
            <img src={billIcon} alt="bill icon" />
            <span>Cadastro de cobrança</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BillForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BillModal;
