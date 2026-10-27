const OutfitCard = ({id, nombre, temporada, prendas, emoji, categoria, estilo}) => {
    return (
        <article className="outfit" id={id}>
            <div className={`outfit-image ${estilo}`}><span className="tag">{categoria}</span><span className="clothes">{emoji}</span>
            </div>
            <div className="outfit-info">
                <h3>{nombre}</h3>
                <p>{prendas} prendas · {temporada}</p>
            </div>
        </article>
    )
}

export default OutfitCard;