import Modal from "react-modal";
import EditPrendaForm from "../forms/EditPrendaForm";

const EditarPrendaModal = ({
    isOpen,
    onRequestClose,
    prenda,
    onSave
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar Prenda"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <EditPrendaForm
                prenda={prenda}
                onSave={onSave}
                onCancel={onRequestClose}
            />
        </Modal>
    );
};

export default EditarPrendaModal;
