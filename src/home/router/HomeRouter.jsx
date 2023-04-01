import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { NavBar } from '../../navigators/components/NavBar'
import { HomeMenu } from '../../home/pages/HomeMenu'
import { PerfilUser } from '../../home/pages/PerfilUser'
import { Cours } from '../../curso/components/Cours'
import { CursoRoter } from '../../curso/router/CursoRoter';
import { EditCurso } from './../../curso/pages/EditCurso';
import { InicioCurso } from './../../curso/pages/InicioCurso';
import { ListaEstud } from './../../curso/pages/ListaEstud';
import { CreateCours } from './../../curso/pages/CreateCours';
import { CreatActiv } from '../../curso/pages/CreatActiv'
import { NewActivi } from '../../curso/pages/NewActivi'
import { NewEvent } from '../../curso/pages/NewEvent'
import { CreateEvent } from '../../curso/pages/createEvent'

export const HomeRouter = () => {

  return (
    <>
      <NavBar></NavBar>

      <Routes>
        <Route path="home/*" element={<HomeMenu />} />
        <Route path="/perfil" element={<PerfilUser />} />
        <Route path="/curso//*" element={<CursoRoter />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/curso/editCurso/:id" element={<EditCurso></EditCurso>} />
        <Route path="/curso/iniCurso" element={<InicioCurso></InicioCurso>} />
        <Route path="/curso/listEstud/:idC" element={<ListaEstud></ListaEstud>} />
        <Route path="/curso/createCours" element={<CreateCours></CreateCours>} />
        <Route path="/curso/creatActiv/:idA/:idC" element={<CreatActiv></CreatActiv>} />
        <Route path="/curso/newActiv/:idC" element={<NewActivi></NewActivi>} />
        <Route path="/curso/newEvent/:idC" element={<NewEvent></NewEvent>} />
        <Route path="/curso/createEvent/:idE/:idC" element={<CreateEvent></CreateEvent>} />
      </Routes>
    </>

  )
}
