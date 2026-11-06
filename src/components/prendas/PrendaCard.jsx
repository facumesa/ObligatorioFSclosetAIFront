
const PrendaCard = ({ prenda, onVer, onEditar, onEliminar }) => {
    return (
        <article
            className="armario-card"
            onClick={() => onVer?.(prenda)}
        >
            <div className="armario-card-imagen">
                {prenda.imagen ? (
                    <img
                        src={prenda.imagen}
                        alt={prenda.nombre}
                    />
                ) : (
                    <div className="armario-card-placeholder">
                        <span>Sin imagen</span>
                    </div>
                )}

                <span className="armario-card-temporada">
                    {prenda.temporada}
                </span>
            </div>

            <div className="armario-card-contenido">
                <span className="armario-card-tipo">
                    {prenda.tipo}
                </span>

                <h3>{prenda.nombre}</h3>

                <div className="armario-card-detalles">
                    <span>{prenda.color}</span>

                    {prenda.marca && (
                        <>
                            <span className="armario-card-punto">·</span>
                            <span>{prenda.marca}</span>
                        </>
                    )}
                </div>

                <div className="armario-card-acciones">
                    <button
                        type="button"
                        className="armario-btn-editar"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditar?.(prenda);
                        }}
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        className="armario-btn-eliminar"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEliminar?.(prenda);
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
    );
};

export default PrendaCard;
