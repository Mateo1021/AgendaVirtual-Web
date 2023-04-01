
import React, { useLayoutEffect } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, onSnapshot, where, getDoc, updateDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/styleCours.css"
import { async } from '@firebase/util';


export const CreateEvent = () => {
  document.body.style.backgroundColor = "#f5f5f5";
  const { idE, idC } = useParams();
  const navigate = useNavigate();


  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }

  const [titelShow, settitelShow] = useState('')
  const [bodyShow, setbodyShow] = useState('')
  const [startDate, setStartDate] = useState(new Date());

  const [asist, setasist] = useState([])

  const [idUSers, setidUSers] = useState([])

  const [inasist, setinasist] = useState([])


  const getUserbyid = async (id) => {

    let arrayTemp = []
    for (let y of id) {
      const coursoRef = doc(db.db, "Usuarios", y);
      const docSnap = await getDoc(coursoRef);
      arrayTemp.push(docSnap.data().Nombres + ' ' + docSnap.data().Apellidos)
    }
    setasist(arrayTemp)
  }

  useLayoutEffect(() => {

    const unsub = onSnapshot(doc(db.db, "evento", idE), (doc) => {
      settitelShow(doc.data().titulo);
      setbodyShow(doc.data().body)
      setStartDate(doc.data().createdAt.toDate())
      setidUSers(doc.data().asistencia)
      getUserbyid(doc.data().asistencia)


    });

  }, [])

  const uptadeEvent = async () => {
    const washingtonRef = doc(db.db, "evento", idE);
    await updateDoc(washingtonRef, {
      titulo: titelShow,
      body: bodyShow,
      createdAt: startDate
    });

    sendProyect()
  }



  const ValidAsistencia = async () => {
    const q = query(collection(db.db, "Usuarios"), where("idCurso", "==", idC));
    const querySnapshot = await getDocs(q);
    let idUSerTod = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      idUSerTod.push(doc.data())
    });
    console.log(idUSerTod);
    console.log(idUSers);


    const diff = [];
    idUSerTod.forEach((elem) => {
      if (!idUSers.includes(elem.codUser)) {
        diff.push(elem);
      }
    });

    console.log(diff);

    setinasist(diff)

  }


  return (
    <div className='contCreatElement mt-5'>

      <div className='cardForos'>
        <div className='mt-4'>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="titel">Titulo</Form.Label>
            <Form.Control
              type="text"
              id="titel"
              aria-describedby="passwordHelpBlock"
              onChange={e => settitelShow(e.target.value)}
              value={titelShow}
            />

          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label htmlFor="bodyEvent">Descripcion</Form.Label>
            <Form.Control as="textarea" id="bodyEvent" rows={3} onChange={e => setbodyShow(e.target.value)}
              value={bodyShow}
            />
          </Form.Group>
          <Form.Label >Fecha</Form.Label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

          <div className='d-flex justify-content-between mt-3 mb-5'>
            <button className='btn orange'
              onClick={() => { uptadeEvent() }}
            >
              Crear Evento
            </button>
            <button className='btn orange'
              onClick={ValidAsistencia}
            >
              Validar asistencia
            </button>

            <button className='btn orange'
              onClick={sendProyect}
            >
              Cancelar
            </button>

          </div>
        </div>

        <div className='contAsistencia'>
          <div className='restulValidAsis'>
            <h4>Asistencia</h4>
            {asist.map((id, index) => (

              <li key={index}>{id}</li>

            ))}
          </div>

          <div className='restulValidAsis'>
            <h4>Inasistencia</h4>
            {inasist.map((id, index) => (

              <li key={index}>{id.Nombres}</li>

            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
