
import Modal from "react-modal";
import EliminarCategoriaForm from "../forms/EliminarCategoriaForm";

const EliminarCategoriaModal = ({
    isOpen,
    onRequestClose,
    categoria,
    onConfirm,
    eliminando
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Eliminar categoría"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <EliminarCategoriaForm
                categoria={categoria}
                onCancel={onRequestClose}
                onConfirm={onConfirm}
                eliminando={eliminando}
            />
        </Modal>
    );
};

export default EliminarCategoriaModal;
