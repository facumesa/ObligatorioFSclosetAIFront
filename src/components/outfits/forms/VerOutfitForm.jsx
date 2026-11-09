const VerOutfitForm = ({ outfit, onCancel }) => {
  if (!outfit) return null;

  return (
    <div className="ver-outfit">
      <div className="ver-outfit-header">
        <span className="ver-outfit-eyebrow">
          MI VESTIDOR / DETALLE DEL OUTFIT
        </span>

        <h2>{outfit.nombre}</h2>

        {outfit.descripcion && (
          <p className="ver-outfit-descripcion">{outfit.descripcion}</p>
        )}

        <div className="ver-outfit-etiquetas">
          <span>{outfit.categoriaId?.nombre}</span>
          <span>{outfit.temporada}</span>

          {outfit.favorito && (
            <span className="ver-outfit-favorito">♥ Favorito</span>
          )}
        </div>
      </div>

      <div className="ver-outfit-separador" />

      {outfit.prendas.length === 0 ? (
        <div className="mis-outfit-info">
          <h3>Este outfit ya no tiene prendas</h3>
          <p>
            Las prendas que lo componían fueron eliminadas de tu armario. Podés
            eliminar este outfit o agregarle nuevas prendas.
          </p>
        </div>
      ) : (
        <div className="ver-outfit-prendas-header">
          <div>
            <h3>Prendas de este outfit</h3>
            <p>Las piezas que forman esta combinación.</p>
          </div>

          <span className="ver-outfit-contador">
            {outfit.prendas?.length || 0} prendas
          </span>
        </div>
      )}

      <div className="ver-outfit-prendas-grid">
        {outfit.prendas?.map((prenda) => (
          <div className="ver-outfit-prenda" key={prenda._id}>
            <div className="ver-outfit-prenda-imagen">
              {prenda.imagen ? (
                <img src={prenda.imagen} alt={prenda.nombre} />
              ) : (
                <span>👕</span>
              )}
            </div>

            <div className="ver-outfit-prenda-info">
              <h4>{prenda.nombre}</h4>
              <p>
                {prenda.tipo} · {prenda.color}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="ver-outfit-acciones">
        <button type="button" className="btn-volver-outfit" onClick={onCancel}>
          ← Volver a mis outfits
        </button>
      </div>
    </div>
  );
};

export default VerOutfitForm;
