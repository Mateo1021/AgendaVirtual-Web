import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InicioAdmin } from '../pages/InicioAdmin'
import { listaDocentes } from '../pages/ListaDocentes'

export const HomeAdmin = () => {
  return (
    <>

   <Routes>
       <Route path="/InicioAdmin" element={<InicioAdmin/>}/>
       <Route path="/listaDocentes" element={<listaDocentes/>}/>
   </Routes>
   </>

  )
}