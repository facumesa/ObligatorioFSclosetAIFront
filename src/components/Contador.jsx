import { useSelector } from "react-redux";

const Contador = () => {

    // const contador = 0;

    const contador = useSelector(state => state.contador.cuenta);

  return (
    <div>{contador}</div>
  )
}

export default Contador