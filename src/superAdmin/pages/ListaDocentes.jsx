import React from 'react'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, orderBy, updateDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';

export const ListaDocentes = () => {
  const navigate = useNavigate();
  const SendProyect = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const sendIniAdmin = () => {
    navigate('/admin')
  }

  const sendInfoItem = (tipo, id) => {
    navigate('/info/' + tipo + '/' + id)
  }
  const [listElement, setlistElement] = useState([])
const [saveInfo, setsaveInfo] = useState([])
  const [item, setitem] = useState('')
  const [cantTxt, setcantTxt] = useState(0)

  const validSearchTable = () => {
    if (item == '1') {
      getProfDat("UsuariosWeb")
    } else if (item == '2') {
      getProfDat("Usuarios")
    } else if (item == '3') {
      getProfDat("Cursos")
    }
  }

  const getProfDat = async (element) => {
    let arrayPrfof = []
    const qProf = query(collection(db.db, element));
    const querySnapshotProf = await getDocs(qProf);
    querySnapshotProf.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arrayPrfof.push(doc.data());
    });
    setlistElement(arrayPrfof)
    setsaveInfo(arrayPrfof)
  }

  const SearchinElement = (txt) => {
    let arraySearh = []
    let newArray = []
    if(cantTxt>txt.length){
      arraySearh = saveInfo;
    }else{
      arraySearh = listElement;
    }
      for (let y in arraySearh) {
        if (JSON.stringify(arraySearh[y]).replaceAll('"'," ").toLowerCase().includes(txt.toLowerCase())) {
          newArray.push(arraySearh[y])
        }
      }
      setcantTxt(txt.length)
      setlistElement(newArray)

  }


  const RenderTable = () => {
    if (item == '1') {
      return (
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {listElement.map((item, index) => (
              <tr key={index} onClick={() => sendInfoItem('pf', item.id)}>
                <td>{item.id}</td>
                <td>{item.nombre} {item.apellido}</td>
                <td>{item.correo}</td>
                <td>{item.cargo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    } else if (item == '2') {
      return (
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Puntaje</th>
              <th>Id Curso</th>
            </tr>
          </thead>
          <tbody>
            {listElement.map((item, index) => (
              <tr key={index} onClick={() => sendInfoItem('es', item.codUser)}>
                <td>{item.codUser}</td>
                <td>{item.Nombres} {item.Apellidos}</td>
                <td>{item.Correo}</td>
                <td>{item.Puntaje}</td>
                <td>{item.idCurso}</td>

              </tr>
            ))}
          </tbody>
        </Table>
      )
    } else if (item == '3') {
      return (
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>Cod</th>
              <th>Nombre</th>
              <th>Nombre Docente</th>
              <th>Cantidad Estudiantes</th>
              <th>Clave Ingreso</th>
              <th>Clave Salida</th>
            </tr>
          </thead>
          <tbody>
            {listElement.map((item, index) => (
              <tr key={index} onClick={() => sendInfoItem('co', item.codCurso)}>
                <td>{item.codCurso}</td>
                <td>{item.nombreCurso}</td>
                <td>{item.nombreDocente} {item.apellidosDocente}</td>
                <td>{item.cantEstudiantes}</td>
                <td>{item.claveDingreso}</td>
                <td>{item.ClaveDSalida}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
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


        <label className="form-label">Lista de tablas disponibles</label>
        <select className='form-control' aria-label="Default select example" onChange={(e) => setitem(e.target.value)}>
          <option value="0">Selecciona el item</option>
          <option value="1">Profesores</option>
          <option value="2">estudiantes</option>
          <option value="3">Cursos</option>
        </select>
        <button
          className='btn orange'
          onClick={validSearchTable}
        >
          Generar tabla
        </button>


        <input type={'text'} className='form-control' onChange={(e) => SearchinElement(e.target.value)}  ></input>
        <RenderTable></RenderTable>

        <div>
          <button
            onClick={sendIniAdmin}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )

  }
}
