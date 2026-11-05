const EliminarOutfitForm = ({ outfit, onCancel, onConfirm }) => {
    return (
        <div className="eliminar-outfit">
            <div className="eliminar-icono">!</div>

            <h2>¿Eliminar outfit?</h2>

            <p>
                ¿Estás seguro de que querés eliminar
                <strong> {outfit?.nombre}</strong>?
            </p>

            <p className="eliminar-advertencia">
                Esta acción no se puede deshacer.
            </p>

            <div className="eliminar-acciones">
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>

                <button type="button" onClick={onConfirm}>
                    Sí, eliminar
                </button>
            </div>
        </div>
    );
};

export default EliminarOutfitForm;