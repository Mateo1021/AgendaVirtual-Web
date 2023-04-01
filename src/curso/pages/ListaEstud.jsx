import React, { useLayoutEffect } from 'react'
import { Cours } from './../components/Cours';
import { BtnCreateCours } from '../components/BtnCreateCours';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { GrShieldSecurity, GrClose,GrFormClose } from "react-icons/gr";

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { async } from '@firebase/util';

export const ListaEstud = () => {
  const { idC } = useParams();


  const [listaEstudiantes, setlistaEstudiantes] = useState([])
  const [show, setShow] = useState(false);

  const [estudSelect, setestudSelect] = useState({})
  const [insigSelect, setinsigSelect] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  useLayoutEffect(() => {

    const estudRef = collection(db.db, "Usuarios");
    const q = query(estudRef, where("idCurso", "==", idC));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const estuds = [];
      querySnapshot.forEach((doc) => {
        estuds.push(doc.data());
      });
      setlistaEstudiantes(estuds)
    });

  }, [])

  const delStud = async (id) => {
    const ustudRef = doc(db.db, "Usuarios", id);
    await updateDoc(ustudRef, {
      idCurso: '0'
    });
  }

  const addMedalla = (id) => {
    setestudSelect(id)
    handleShow()
  }
  const validInsignia = (number) => {
    switch (number) {
      case 1:
        return 'Estudiante participativo'
      case 2:
        return 'Experto en foros'
      case 3:
        return 'Baja participacion'
      case 4:
        return 'Experto en cuestionarios'
      case 5:
        return 'Experto en nuevas ideas'
      case 6:
        return 'Experto en la web'
      case 7:
        return 'Experto en documentos '
      case 8:
        return 'Experto en gaming'
      case 9:
        return 'El rey del curso'
      case 10:
        return 'Campeon definitivo'

      default:
        return 'No tiene ninguna insignia'
    }
  }

  const addInsignia = async () => {
    console.log(insigSelect);
    console.log(estudSelect.idUser);
    const ustudRef = doc(db.db, "Usuarios", estudSelect.idUser);
    let arrayStud = (estudSelect.insignias);

    if (arrayStud.indexOf(Number(insigSelect)) < 0) {
      arrayStud.push(Number(insigSelect))
    } 
    await updateDoc(ustudRef, {
      insignias: arrayStud
    });

    handleClose()
  }
  const delInsig= async(insig)=>{
    console.log(insig);
    const ustudRef = doc(db.db, "Usuarios", estudSelect.idUser);
    let arrayStud = (estudSelect.insignias);
    const resutl =arrayStud.filter(x=>x !== insig)
    await updateDoc(ustudRef, {
      insignias: resutl
    });
    handleClose()
  }
  function InsginiasHave() {
    return (
      <div>
        <Modal.Body>
          <h4>Las insignias de {estudSelect.Nombres}</h4>
          {
            estudSelect.insignias.map((item, index) => (

              <li key={index}>{validInsignia(item)} <GrFormClose onClick={()=>delInsig(item)}/></li>
            ))
          }
          <Form.Select aria-label="Default select example"
            onChange={e => setinsigSelect(e.target.value)}
          >
            <option>Seleccion la insignia</option>
            <option value="1">Estudiante participativo</option>
            <option value="2">Experto en foros</option>
            <option value="3">Baja participacion</option>
            <option value="4">Experto en cuestionarios</option>
            <option value="5">Experto en nuevas ideas</option>
            <option value="6">Experto en la web</option>
            <option value="7">Experto en documentos</option>
            <option value="8">Experto en gaming</option>
            <option value="9">El rey del curso</option>
            <option value="10">Campeon definitivo</option>
          </Form.Select>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <button className='btn orange' onClick={() => addInsignia()}>
            Agregar
          </button>
        </Modal.Footer>
      </div>

    )
  }

  return (
    <>
      <div className='d-flex justify-content-center mb-2 mt-3'>
        <h1>LISTA DE ESTUDIANTES</h1>
      </div>
      <div>
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Puntaje</th>
              <th>Medallas</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {listaEstudiantes.map((item, index) => (
              <tr key={index}>
                <td>{item.codUser}</td>
                <td>{item.Nombres}</td>
                <td>{item.Puntaje}</td>
                <td  onClick={() => { addMedalla(item) }}>
                  <div className='actionMed'>
                  <GrShieldSecurity size={25}>
                  </GrShieldSecurity>
                  </div>
                </td>
                <td className='actionMed' onClick={() => { delStud(item.codUser) }}>
                  <div className='ActionDel'>
                  <GrFormClose size={28}></GrFormClose>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar insignias</Modal.Title>
        </Modal.Header>
        <InsginiasHave></InsginiasHave>
      </Modal>



    </>
  )
}
