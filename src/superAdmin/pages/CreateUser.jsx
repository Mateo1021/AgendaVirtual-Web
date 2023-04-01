import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, query, collection, getDocs } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig'
import at from '../../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
export const CreateUser = () => {
  const navigate = useNavigate();

  const [name, setname] = useState('')
  const [lastName, setlastName] = useState('')
  const [mail, setmail] = useState('')
  const [pass, setpass] = useState('')
  const [cargo, setcargo] = useState('')

  const goInicioAdmin = () => {
    navigate('/admin')
  }

  const getIdUser = async () => {
    const q = query(collection(db.db, "UsuariosWeb"));
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
    let idCoursComplet = 'us_' + (++idCoursDb);

    return (idCoursComplet);
  }


  const createUser = async () => {

    console.log(name, lastName, mail, pass, cargo);
    let idUser = await getIdUser()
    await setDoc(doc(db.db, "UsuariosWeb", idUser), {
      apellido: lastName,
      cargo: cargo,
      correo: mail,
      id: idUser,
      nombre: name
    });

    createUserWithEmailAndPassword(at.at, mail, pass)
      .then((userCredential) => {

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    setname('')
    setlastName('')
    setmail('')
    setcargo('')
    setpass('')
    goInicioAdmin()


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
      <div className='p-5'>
        <h1>CREAR USUARIO</h1>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nameCours" onChange={(e) => setname(e.target.value)} />

          <label className="form-label">Apellidos</label>
          <input type="text" className="form-control" id="lastName" onChange={(e) => setlastName(e.target.value)} />

          <label className="form-label">Correo</label>
          <input type="text" className="form-control" id="mail" onChange={(e) => setmail(e.target.value)} />

          <label className="form-label">Contraseña</label>
          <input type="text" className="form-control" id="mail" onChange={(e) => setpass(e.target.value)} />

          <label className="form-label">Cargo</label>
          <select className='form-control' aria-label="Default select example" onChange={(e) => setcargo(e.target.value)}>
            <option value="0">Selecciona el cargo</option>
            <option value="admin">Administrado</option>
            <option value="profesor">Profesor</option>
          </select>
        </div>


        <button className="btn orange" onClick={createUser}>Crear</button>

        <button className="btn orange" onClick={goInicioAdmin}>Cancelar</button>

      </div>
    )
  }
}
