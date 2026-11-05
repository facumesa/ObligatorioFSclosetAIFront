import Modal from "react-modal";
import VerOutfitForm from "../forms/VerOutfitForm";

const VerOutfitModal = ({
    isOpen,
    onRequestClose,
    outfit
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Ver Outfit"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <VerOutfitForm
                outfit={outfit}
                onCancel={onRequestClose}
            />
        </Modal>
    );
};

export default VerOutfitModal;