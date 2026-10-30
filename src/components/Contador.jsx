import { useSelector } from "react-redux";
import { Outlet } from "react-router";


const Contador = () => {

    // const contador = 0;

    const contador = useSelector(state => state.contador.cuenta);

  return (
    <div>{contador}
    <Outlet/>
    </div>
  )
}

export default Contador