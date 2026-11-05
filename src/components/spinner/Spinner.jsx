import { useSelector } from "react-redux";

const Spinner = () => {

    const cargando = useSelector((state) => state.spinner.cargando);

    if(!cargando) return null;

  return (
    <div className="spinner-overlay" role="status" aria-live="polite">
      <div className="spinner-circle" />
      <span className="spinner-text">Cargando...</span>
    </div>
  )
}

export default Spinner