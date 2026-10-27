import React from 'react'

const Boton = () => {
  
    const aumentarCuenta = () => {
        console.log("click");
    }
  
    return (
    <div>
        <input type="button" value="Incrementar" onClick={aumentarCuenta}/>
    </div>
  )
}

export default Boton