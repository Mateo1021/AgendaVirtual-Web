import React, { useEffect, useState } from 'react'

import db from '../../../firebase/firebaseConfig'
import { doc, setDoc } from "firebase/firestore";


import { collection, query, where, getDocs } from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const storage = getStorage();

let idCurso = "";
let codCuors;
let codProfesor;
let nameProfesor;
let user = "";



export const CreateCours = () => {
  document.body.style.backgroundColor = "#f5f5f5";
  let base = db

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);



  const [courseName, setcourseName] = useState('');
  const [descL, setdescL] = useState('');
  const [temaCou, settemaCou] = useState('');
  const [descShort, setdescShort] = useState('');
  const [passRemove, setpassRemove] = useState('');
  const [banner, setbanner] = useState('');






  async function getId() {
    const q = query(collection(base.db, "Cursos"));
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
    let idCoursComplet = 'pg_' + (++idCoursDb);

    return (idCoursComplet);
  }
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    console.log(2);
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setbanner(url)
        });
      }
    );
  };

  const createCurs = async () => {
    let isResponse = await getId()
    let infoDocente = JSON.parse(sessionStorage.getItem('codUserWb'))


    await setDoc(doc(base.db, "Cursos", isResponse), {
      ClaveDSalida: passRemove,
      apellidosDocente: infoDocente.apellido,
      banerCurso: banner,
      cantEstudiantes: '0',
      claveDingreso: '0',
      codCurso: isResponse,
      codDocente: infoDocente.id,
      largeDescription: descL,
      nombreCurso: courseName,
      nombreDocente: infoDocente.nombre,
      shortDescrip: descShort,
      temas: temaCou,
    });
  }


  return (
    <div className='p-5'>
      <h1>CREAR CURSO</h1>
      <div className="mb-3">
        <label className="form-label">Nombre Curso</label>
        <input type="text" className="form-control" id="nameCours" placeholder="Fotografia"
          onChange={e => setcourseName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripcion del curso</label>
        <textarea className="form-control" id="largeDesc" rows="3" placeholder='Curso de fotografia para principiantes enfocado en...'
          onChange={e => setdescL(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Temas del curso</label>
        <textarea className="form-control" id="temas" rows="3" placeholder='Fotografia y video, Planos, Edicion'
          onChange={e => settemaCou(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripcion corta </label>
        <input type="text" className="form-control" id="shortDesc" placeholder="Curso de fotografia y edicion"
          onChange={e => setdescShort(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Clave para retiro</label>
        <input type="text" className="form-control" id="shortDesc" placeholder="Curso de fotografia y edicion"
          onChange={e => setpassRemove(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <div>
          <label className="form-label">Banner para el curos</label>
          <input className="form-control" type="file" onChange={handleChange} id="formFile" accept="/image/*" />
          <br></br>
          <button type="button" className="btn btn-secondary orange" onClick={handleUpload}>Cargar Imagen</button>

          <p>{percent}%</p>
        </div>

      </div>
      <button type="button" className="btn orange" onClick={createCurs}>Crear</button>

    </div>
  )
}
