import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/StayleClass.css'

export const BtnCreateCours = () => {

  const navigate = useNavigate();
  const goCreate =()=>{
    navigate('/curso/createCours',{replace:true})
  }
    
  return (
    <button type="button" className="btn orange" onClick={goCreate}>Crear Curso</button>
  )
}
