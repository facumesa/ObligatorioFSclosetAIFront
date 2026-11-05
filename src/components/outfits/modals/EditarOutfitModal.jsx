import Modal from 'react-modal'
import EditOutfitForm from '../forms/EditOutfitForm';

const EliminarOutfitModal = ({ isOpen, onRequestClose, outfit, onSave }) => {

    return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Editar Outfit"
    className="modal-content"
    overlayClassName="modal-overlay"
    >
        <EditOutfitForm outfit={outfit} onSave={onSave} onCancel={onRequestClose}/>
    </Modal>
  )
};

export default EliminarOutfitModal;
