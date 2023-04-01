import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CreatActiv } from '../pages/CreatActiv';
import { CreateEvent } from '../pages/createEvent';
import { EditCurso } from '../pages/EditCurso';
import { InicioCurso } from '../pages/InicioCurso';
import { ListaEstud } from '../pages/ListaEstud';
import { NewActivi } from '../pages/NewActivi';
import { NewEvent } from '../pages/NewEvent';
import { Cours } from './../components/Cours';

export const CursoRoter = () => {
  return (
    <>
       
       <Routes>
          <Route path="/curso/iniCurso" element={<InicioCurso></InicioCurso>} />
          <Route path="/curso/editCurso/:id" element={<EditCurso></EditCurso>} />
          <Route path="/curso/listEstud/:idC" element={<ListaEstud></ListaEstud>} />
          <Route path="/curso/creatActiv/:idA/:idC" element={<CreatActiv></CreatActiv>} />
          <Route path="/curso/newActiv/:idC" element={<NewActivi></NewActivi>} />
          <Route path="/curso/newEvent/:idC" element={<NewEvent></NewEvent>} />
          <Route path="/curso/createEvent/:idE/:idC" element={<CreateEvent></CreateEvent>} />

        </Routes>
      

    </>
  )
}
