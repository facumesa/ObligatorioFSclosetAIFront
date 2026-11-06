
const VerPrendaDetalle = ({ prenda, onCancel }) => {
    if (!prenda) return null;

    return (
        <div className="ver-prenda">
            <span className="ver-outfit-eyebrow">
                MI ARMARIO / DETALLE DE PRENDA
            </span>

            <h2>{prenda.nombre}</h2>

            <div className="ver-prenda-contenido">
                <div className="ver-prenda-imagen">
                    {prenda.imagen ? (
                        <img
                            src={prenda.imagen}
                            alt={prenda.nombre}
                        />
                    ) : (
                        <span>Sin imagen</span>
                    )}
                </div>

                <div className="ver-prenda-info">
                    <div>
                        <span className="ver-prenda-label">Tipo</span>
                        <p>{prenda.tipo}</p>
                    </div>

                    <div>
                        <span className="ver-prenda-label">Color</span>
                        <p>{prenda.color}</p>
                    </div>

                    <div>
                        <span className="ver-prenda-label">Temporada</span>
                        <p>{prenda.temporada}</p>
                    </div>

                    {prenda.marca && (
                        <div>
                            <span className="ver-prenda-label">Marca</span>
                            <p>{prenda.marca}</p>
                        </div>
                    )}

                    {prenda.descripcion && (
                        <div>
                            <span className="ver-prenda-label">
                                Descripción
                            </span>
                            <p>{prenda.descripcion}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="ver-outfit-acciones">
                <button
                    type="button"
                    className="btn-volver-outfit"
                    onClick={onCancel}
                >
                    ← Volver a Mi Armario
                </button>
            </div>
        </div>
    );
};

export default VerPrendaDetalle;
