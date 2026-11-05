import Modal from "react-modal";
import EliminarOutfitForm from "../forms/EliminarOutfitForm";

const EliminarOutfitModal = ({
    isOpen,
    onRequestClose,
    outfit,
    onConfirm
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Eliminar Outfit"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <EliminarOutfitForm
                outfit={outfit}
                onCancel={onRequestClose}
                onConfirm={onConfirm}
            />
        </Modal>
    );
};

export default EliminarOutfitModal;