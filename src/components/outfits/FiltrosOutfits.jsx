
const FiltrosOutfits = ({
  temporada,
  setTemporada,
  favorito,
  setFavorito,
  setPagina,
}) => {
  return (
    <div className="mis-outfits-toolbar">
      <div className="mis-outfits-filters">
        <select
          value={temporada}
          onChange={(e) => {
            setTemporada(e.target.value);
            setPagina(1);
          }}
        >
          <option value="">Todas las temporadas</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
          <option value="Cualquiera">Cualquiera</option>
        </select>

        <select
          value={favorito}
          onChange={(e) => {
            setFavorito(e.target.value);
            setPagina(1);
          }}
        >
          <option value="">Todos los outfits</option>
          <option value="true">Favoritos</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosOutfits;
