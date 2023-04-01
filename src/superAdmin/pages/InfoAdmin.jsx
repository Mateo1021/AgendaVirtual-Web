import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export const InfoAdmin = () => {
  const { tipoU, idU } = useParams();
  const navigate = useNavigate();
  const sendIni = () => {
    navigate('/admin')
  }
  const sendTablas = () => {
    navigate('/listaDocentes')
  }


  return (
    <div>
      InfoAdmin {tipoU} {idU}





      <div>
        <button
          onClick={sendIni}
        >
          Volver al inicio
        </button>
        <button
          onClick={sendTablas}
        >
          Volver tablas
        </button>
      </div>
    </div>



  )
}
