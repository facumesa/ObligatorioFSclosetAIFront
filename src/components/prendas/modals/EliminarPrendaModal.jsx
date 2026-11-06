import Modal from "react-modal";
import EliminarPrendaForm from "../forms/EliminarPrendaForm";

const EliminarPrendaModal = ({
    isOpen,
    onRequestClose,
    prenda,
    onConfirm
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Eliminar Prenda"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <EliminarPrendaForm
                prenda={prenda}
                onCancel={onRequestClose}
                onConfirm={onConfirm}
            />
        </Modal>
    );
};

export default EliminarPrendaModal;