import React, { useState } from 'react'

export const FormCreateCours = () => {
    const [dataCours, setDataCours] = useState({
        nombreC:'',
        temasC:'',
        nameBanner:''
    });

  return (
      
    <div className='p-5'>
        <h1>Crear Curso</h1>
        <div className="mb-3">
        <label  className="form-label">Nombre Curso</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
        value={dataCours.nombreC} onChange={e => setDataCours(e.target.value)}
        />
        </div>
        <div className="mb-3">
        <label className="form-label">Temas Del Curso</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
        value={dataCours.temasC} onChange={e => setDataCours(e.target.value)}
        ></textarea>
        </div>
        <div className="mb-3">
        <label className="form-label">Banner para el curos</label>
        <input className="form-control" type="file" id="formFile"
        value={dataCours.nameBanner} onChange={e => setDataCours(e.target.value)}
        />
        </div>
    </div>

  )
}