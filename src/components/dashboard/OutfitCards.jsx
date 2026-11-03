import OutfitCard from "./OutfitCard";

const OutfitCards = ({ outfits }) => {

    const estilos = ["one", "two", "three"];

    if (outfits.length === 0) {
        return (
            <div className="empty-outfits">
                <h3>¡Todavía no tenés outfits creados!</h3>
                <p>Empezá a combinar tus prendas y creá tu primer look.</p>
            </div>
        );
    }
    
    return (
        <div className="cards">
            {outfits.slice(0, 3).map((outfit, index) => (
                <OutfitCard
                    key={outfit._id}
                    nombre={outfit.nombre}
                    temporada={outfit.temporada}
                    prendas={outfit.prendas}
                    emoji="👕👖"
                    categoria={outfit.categoriaId?.nombre}
                    estilo={estilos[index]}
                />
            ))}
        </div>
    );
};

export default OutfitCards;