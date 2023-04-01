
import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs, addDoc } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import { async } from '@firebase/util';


export const NewActivi = () => {
  document.body.style.backgroundColor = "#f5f5f5";

  const { idC } = useParams();

  const [titulo, settitulo] = useState('')
  const [bodyAc, setbody] = useState('')
  const [dateReg, setdateReg] = useState(new Date())
  const [tipoSelect, settipoSelect] = useState('0')


  const [preguntas, setpreguntas] = useState([])
  const [palabrasA, setpalabrasA] = useState([])

  const [preg, setpreg] = useState(false)




  const navigate = useNavigate();
  const sendProyect = () => {
    navigate('/curso/editCurso/' + idC)
  }
  const getIdReg = async () => {

    const q = query(collection(db.db, "registrosForo"));
    const querySnapshot = await getDocs(q);
    let idCours = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      idCours.push(doc.id.split('_')[1]);
    });
    idCours.sort((a, b) => {
      return a - b;
    });

    let idCoursDb = idCours[idCours.length - 1];
    let idCoursComplet = 'reg_' + (++idCoursDb);

    return (idCoursComplet);
  }
  const addReg = async () => {
    let idResponse = await getIdReg()

    await setDoc(doc(db.db, "registrosForo", idResponse), {
      body: bodyAc,
      idRegistro: idResponse,
      codProyecto: idC,
      titulo: titulo,
      createdAt: dateReg,
      file: 'test',
      active: '1',
      participacion: []
    });

    for (let x in preguntas) {
      await addDoc(collection(db.db, "preguntas"), {
        codReg: idResponse,
        pregunta: preguntas[x].pregunta,
        respuestas: preguntas[x].opciones,
        respuesta: preguntas[x].respuesta,
      });

    }
    for (let x in palabrasA) {
      await addDoc(collection(db.db, "preguntasAhoracodo"), {
        codRegistro: idResponse,
        palabra: palabrasA[x].palabra,
        pistas: palabrasA[x].pistas,
      });
    }

    setbody('')
    settitulo('')
    setpreguntas([]);
    sendProyect()
  }


  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const addPregunta = async () => {
    let arrayOption = []
    arrayOption.push(document.getElementById('op1').value)
    arrayOption.push(document.getElementById('op2').value)
    arrayOption.push(document.getElementById('op3').value)
    arrayOption.push(document.getElementById('respuesta').value)
    let newArray = shuffle(arrayOption)

    console.log(newArray);
    console.log(document.getElementById('pregunta').value);



    preguntas.push({
      opciones: newArray,
      pregunta: document.getElementById('pregunta').value,
      respuesta: document.getElementById('respuesta').value
    })

    console.log(preguntas);
    document.getElementById('op1').value = ''
    document.getElementById('op2').value = ''
    document.getElementById('op3').value = ''
    document.getElementById('respuesta').value = ''
    document.getElementById('pregunta').value = ''

    setpreguntas(preguntas);
    setpreg(!preg)
    /* 
    await setDoc(doc(db.db, "preguntas", idCoursComplet), {
      body: bodyAc,
      idRegistro: idResponse,
      codProyecto: idC,
      titulo: titulo,
      createdAt: dateReg,
      file: 'test',
      active: '1',
      participacion: []
    }); */



  }
  const addPalabra = async () => {
    let arrayOption = []
    arrayOption.push(document.getElementById('pis1').value)
    arrayOption.push(document.getElementById('pis2').value)
    arrayOption.push(document.getElementById('pis3').value)
    let newArray = shuffle(arrayOption)

    console.log(newArray);
    console.log(document.getElementById('palabraA').value);



    palabrasA.push({
      pistas: newArray,
      palabra: document.getElementById('palabraA').value,
    })

    console.log(palabrasA);

    document.getElementById('pis1').value = ''
    document.getElementById('pis2').value = ''
    document.getElementById('pis3').value = ''
    document.getElementById('palabraA').value = ''


    setpalabrasA(palabrasA);
    setpreg(!preg)
    /* 
    await setDoc(doc(db.db, "preguntas", idCoursComplet), {
      body: bodyAc,
      idRegistro: idResponse,
      codProyecto: idC,
      titulo: titulo,
      createdAt: dateReg,
      file: 'test',
      active: '1',
      participacion: []
    }); */



  }
  const RenderTipoAct = () => {
    if (tipoSelect == '1') {
      return (<div>Este sera un post para que los estudiantes participen en el mediante la app</div>)
    } else if (tipoSelect == '2') {
      return (
        <div>
          <h4 className='mt-3'>Agregar preguntas</h4>
          <Form.Label htmlFor="titel">Pregunta</Form.Label>
          <Form.Control
            type="text"
            id="pregunta"
          />

          <Form.Label htmlFor="titel">Respuesta</Form.Label>
          <Form.Control
            type="text"
            id="respuesta"
          />
          <Form.Label htmlFor="titel">Opcion 1</Form.Label>
          <Form.Control
            type="text"
            id="op1"
          />
          <Form.Label htmlFor="titel">Opcion 2</Form.Label>
          <Form.Control
            type="text"
            id="op2"
          />
          <Form.Label htmlFor="titel">Opcion 3</Form.Label>
          <Form.Control
            type="text"
            id="op3"
          />

          <button className='btn orange mt-3'
            onClick={addPregunta}
          >Agregar pregunta</button>

          <div>
            <h4 className='mt-3'>Preguntas agregadas</h4>
            {
              preguntas.map((item, index) => (
                <li key={index}>{item.pregunta}</li>
              ))
            }
          </div>
        </div>
      )
    } else if (tipoSelect == '3') {
      return (
        <div>
          <h4 className='mt-3'>Agregar palabras</h4>
          <Form.Label htmlFor="titel">Palabra</Form.Label>
          <Form.Control
            type="text"
            id="palabraA"
          />

          <Form.Label htmlFor="titel">Pista 1</Form.Label>
          <Form.Control
            type="text"
            id="pis1"
          />
          <Form.Label htmlFor="titel">Pista 2</Form.Label>
          <Form.Control
            type="text"
            id="pis2"
          />
          <Form.Label htmlFor="titel">Pista 3</Form.Label>
          <Form.Control
            type="text"
            id="pis3"
          />


          <button className='btn orange mt-3'
            onClick={addPalabra}
          >Agregar Palabra</button>

          <div>
            <h4 className='mt-3'>Palabras agregadas</h4>
            {
              palabrasA.map((item, index) => (
                <li key={index}>{item.palabra}</li>
              ))
            }
          </div>
        </div>
      )
    }
  }


  return (
    <div className='contCreatElement mt-3'>
      <h1>CREAR NUEVA ACTIVIDAD</h1>

      <div className='cardForos'>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="titel">Titulo para la actividad</Form.Label>
          <Form.Control
            type="text"
            id="titel"
            aria-describedby="passwordHelpBlock"
            onChange={e => settitulo(e.target.value)}
          />

        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="bodyEvent">Descripcion de la actividad</Form.Label>
          <Form.Control as="textarea" id="bodyEvent" rows={3} onChange={e => setbody(e.target.value)} />
        </Form.Group>
        <Form.Select  onChange={e => settipoSelect(e.target.value)} aria-label="Default select example">
          <option value="0">Selecciona un tipo</option>
          <option value="1">Post generico</option>
          <option value="2">Trivia</option>
          <option value="3">Ahorcado</option>
        </Form.Select>
        <RenderTipoAct></RenderTipoAct>

        <div className='d-flex justify-content-between'>
          <button
            onClick={addReg}
            className='btn orange mt-5'
          >
            Crear actividad
          </button>
          <button
            onClick={sendProyect}
            className='btn orange mt-5'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
