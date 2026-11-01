
import StatCard from "./StatCard";

const StatCards = ({
  totalPrendas,
  totalOutfits,
  plan,
  cargando,
}) => {
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
      informacion: cargando ? "..." : totalOutfits,
      nota: "✦ Looks para cada ocasión",
    },
    {
      id: 2,
      nombre: "Tu plan actual",
      informacion: plan ? `${plan} ✦` : "—",
      nota: "Descubrí Premium",
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
