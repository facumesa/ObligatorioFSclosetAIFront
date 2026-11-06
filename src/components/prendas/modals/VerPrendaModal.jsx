
import Modal from "react-modal";
import VerPrendaDetalle from "../forms/VerPrendaDetalle";

const VerPrendaModal = ({
    isOpen,
    onRequestClose,
    prenda
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Detalle de Prenda"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <VerPrendaDetalle
                prenda={prenda}
                onCancel={onRequestClose}
            />
        </Modal>
    );
};

export default VerPrendaModal;
