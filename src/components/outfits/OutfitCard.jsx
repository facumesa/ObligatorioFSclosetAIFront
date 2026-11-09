const OutfitCard = ({
  outfit,
  onVer,
  onEditar,
  onEliminar,
  onCambiarFavorito,
}) => {
  return (
    <article className="mis-outfit-card" onClick={() => onVer(outfit)}>
      <div className="mis-outfit-image">
        <span className="mis-outfit-category">
          {outfit.categoriaId?.nombre}
        </span>

        <button
          type="button"
          className="mis-outfit-favorite"
          onClick={(e) => {
            e.stopPropagation();
            onCambiarFavorito(outfit._id, outfit.favorito);
          }}
        >
          {outfit.favorito ? "♥" : "♡"}
        </button>

        <div className="mis-outfit-images">
          {outfit.prendas
            .slice(0, 3)
            .map((prenda) =>
              prenda.imagen ? (
                <img key={prenda._id} src={prenda.imagen} alt={prenda.nombre} />
              ) : (
                <span key={prenda._id}>👕</span>
              ),
            )}
        </div>
      </div>

      <div className="mis-outfit-info">
        <h3>{outfit.nombre}</h3>
        <p>{outfit.descripcion}</p>
        {outfit.prendas.length === 0 ? (
          <div className="mis-outfit-info">
            <h3>Este outfit ya no tiene prendas</h3>
            <p>
              Las prendas que lo componían fueron eliminadas de tu armario.
              Podés eliminar este outfit o agregarle nuevas prendas.
            </p>
          </div>
        ) : (
          <p>
            {outfit.prendas.length} prendas · {outfit.temporada}
          </p>
        )}
        <div className="mis-outfit-actions">
          <button
            type="button"
            className="btn-editar-outfit"
            onClick={(e) => {
              e.stopPropagation();
              onEditar(outfit);
            }}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn-eliminar-outfit"
            onClick={(e) => {
              e.stopPropagation();
              onEliminar(outfit);
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};

export default OutfitCard;
