
import StatCard from "./StatCard";

const StatCards = ({
    totalPrendas,
    totalOutfits,
    plan,
    cargando,
}) => {

    const esPlus = plan?.toLowerCase() === "plus";

    const porcentajeUso = Math.min(
        (totalOutfits / 4) * 100,
        100
    );

    const cards = [
        {
            id: 0,
            nombre: "Prendas guardadas",
            informacion: cargando ? "..." : totalPrendas,
            nota: "↗ Tu colección crece",
        },
        {
            id: 1,
            nombre: "Outfits creados",
            informacion: cargando
                ? "..."
                : esPlus
                    ? `${totalOutfits} / 4`
                    : totalOutfits,

            nota: esPlus
                ? cargando
                    ? "Calculando uso..."
                    : `${porcentajeUso}% del plan utilizado`
                : "✦ Looks para cada ocasión",
        },
        {
            id: 2,
            nombre: "Tu plan actual",
            informacion: plan ? `${plan} ✦` : "Administrador",
            nota: esPlus
                ? "Descubrí Premium"
                : "Disfrutá todos los beneficios",
        },
    ];

    return (
        <div className="stats">
            {cards.map((card) => (
                <StatCard key={card.id} {...card} />
            ))}
        </div>
    );
};

export default StatCards;
