import React from 'react'
import { useNavigate } from 'react-router-dom';

export const InicioAdmin = () => {

  const navigate = useNavigate();

  const SendProyect = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('valid')
    sessionStorage.removeItem('codUserWb')
    navigate('/login')
  }
  const SendLista = () => {
    navigate('/listaDocentes')
  }
  const SendCreate = () => {
    navigate('/createUser')
  }


  if (sessionStorage.getItem('valid') !== '1') {
    return (
      <div>
        <h1>No eres admin logueate como uno</h1>
        <button
          onClick={SendProyect}
        > Go login</button>
      </div>
    )
  } else {
    return (



      <div>test admin

        <button
          onClick={SendLista}
        > go lista </button>
                <button

          onClick={SendCreate}
        > go create </button>

        <button
          onClick={SendProyect}
        >Salir </button>

      </div>
    )

  }

}
