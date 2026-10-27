import OutfitCard from "./OutfitCard";

const OutfitCards = () => {
    
    const cards = [
    {
        id: 0,
        nombre: "Casual de todos los días",
        temporada: "Primavera",
        prendas: 4,
        emoji: "👕👖",
        categoria: "Casual",
        estilo: "one"
    },
    {
        id: 1,
        nombre: "Elegante para salir",
        temporada: "Cualquiera",
        prendas: 3,
        emoji: "👔👞",
        categoria: "Formal",
        estilo: "two"

    },
    {
        id: 2,
        nombre: "Fin de semana",
        temporada: "Otoño",
        prendas: 5,
        emoji: "🧥👟",
        categoria: "Urbano",
        estilo: "three"
    }
];
    
    return (
        <div className="cards"> 
            {cards.map(c => <OutfitCard key={c.id} {...c}/>)}
        </div>
        )
        
}

export default OutfitCards;