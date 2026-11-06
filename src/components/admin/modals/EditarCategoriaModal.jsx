import Modal from "react-modal";
import EditarCategoriaForm from "../forms/EditarCategoriaForm";

const EditarCategoriaModal = ({
    isOpen,
    onRequestClose,
    categoria,
    onSave
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar categoría"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <EditarCategoriaForm
                categoria={categoria}
                onSave={onSave}
                onCancel={onRequestClose}
            />
        </Modal>
    );
};

export default EditarCategoriaModal;