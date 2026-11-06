import Modal from "react-modal";
import CrearCategoriaForm from "../forms/CrearCategoriaForm";

const CrearCategoriaModal = ({ isOpen, onRequestClose, onSave }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Crear categoría"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <CrearCategoriaForm
                onSave={onSave}
                onCancel={onRequestClose}
            />
        </Modal>
    );
};

export default CrearCategoriaModal;