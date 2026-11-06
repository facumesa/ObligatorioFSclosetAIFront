
const EliminarCategoriaForm = ({ categoria, onCancel, onConfirm, eliminando }) => {
    return (
        <div className="eliminar-outfit">
            <div className="eliminar-icono">!</div>

            <h2>¿Eliminar categoría?</h2>

            <p>
                ¿Estás seguro de que querés eliminar
                <strong> {categoria?.nombre}</strong>?
            </p>

            <p className="eliminar-advertencia">
                Esta acción no se puede deshacer.
                No podrás eliminar una categoría que esté siendo
                utilizada por algún outfit.
            </p>

            <div className="eliminar-acciones">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={eliminando}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={eliminando}
                >
                    {eliminando ? "Eliminando..." : "Sí, eliminar"}
                </button>
            </div>
        </div>
    );
};

export default EliminarCategoriaForm;
