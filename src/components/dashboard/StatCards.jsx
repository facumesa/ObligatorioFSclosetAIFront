import StatCard from "./StatCard";

const StatCards = () => {

const cards = [
    { id: 0, nombre: "Prendas guardadas", informacion: 24, nota: "↗ Tu colección crece" },
    { id: 1, nombre: "Outfits creados", informacion: 12, nota: "✦ Looks para cada ocasión", mostrarProgress: true },
    { id: 2, nombre: "Tu plan actual", informacion: "Plus ✦", nota: "Descubrí Premium" }
];

    return (
        <div className="stats"> 
            {cards.map(c => <StatCard key={c.id} {...c}/>)}
        </div>
        )
}

export default StatCards;