const OutfitCard = ({
    nombre,
    temporada,
    prendas = [],
    categoria,
    estilo
}) => {
    const imagenes = prendas.filter((prenda) => prenda?.imagen);

    return (
        <article className="outfit">
            <div className={`outfit-image ${estilo}`}>
                <span className="tag">{categoria}</span>

                <div className="clothes">
                    {imagenes.length > 0 ? (
                        imagenes.slice(0, 3).map((prenda) => (
                            <img
                                key={prenda._id}
                                src={prenda.imagen}
                                alt={prenda.nombre}
                                className="prenda-preview"
                            />
                        ))
                    ) : (
                        <span>👕👖</span>
                    )}
                </div>
            </div>

            <div className="outfit-info">
                <h3>{nombre}</h3>
                <p>{prendas.length} prendas · {temporada}</p>
            </div>
        </article>
    );
};

export default OutfitCard;