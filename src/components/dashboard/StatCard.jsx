
const StatCard = ({ id, nombre, informacion, nota, mostrarProgress }) => {
    return (
        <article className="stat" id={id}><span className="small">{nombre}</span><strong>{informacion}</strong><span
            className="note">{nota}</span>

            {mostrarProgress && (
                <div className="progress">
                    <span></span>
                </div>
            )}

        </article>
    )
}

export default StatCard;
