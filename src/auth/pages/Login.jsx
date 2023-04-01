import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import at from '../../../firebase/firebaseConfig'
import db from '../../../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../context/AuthContext';

import '../../styles/StayleClass.css'
import Logo from '../../images/LogoFundacion.png';
import Background from '../../images/LoginBackground.jpg';


export const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const onLogIn = () => {
    const auth = at;
    const base = db;

    signInWithEmailAndPassword(auth.at, user, pass)
      .then((userCredential) => {
        // ...
        const obtenerDatos = async () => {
          const q = query(collection(base.db, "UsuariosWeb"), where("correo", "==", user));
          const querySnapshot = await getDocs(q);
          let ValidUSer = querySnapshot._snapshot.docChanges.length;
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            sessionStorage.setItem('codUserWb', JSON.stringify(doc.data()))

          });
          if (ValidUSer == 0) {
            alert('Este modulo es solo para profesores')
            /* navigate('/login', { replace: true }) */
          } else {
            login(JSON.parse(sessionStorage.getItem('codUserWb')))
  
            if(JSON.parse(sessionStorage.getItem('codUserWb')).cargo == 'admin'){
              sessionStorage.setItem('valid','1')
              navigate('/admin', {replace:true})
            }else{
              navigate('/home', {})
            }
        
          }

        }
        obtenerDatos();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  return (


    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', backgroundImage: `url(${Background})` }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '70%', height: '90vh' }} >
        <Card className='m-auto' style={{ width: '90%', alignItems: 'center', opacity: '0.95' }}>
          <Card.Img variant="top" src={Logo} style={{ width: '70%', }} />
          <Card.Body>
            <Card.Title>Módulo Web</Card.Title>
            <Card.Text>
              Fundación sin ánimo de lucro que hace 50 años brinda educación, primaria, secundaria y mediatéc
            </Card.Text>
            <form className="">
              <div style={{ width: '50%', marginLeft: '25%', marginRight: '25%' , paddingTop: '2%' }}>
                <label htmlFor="staticEmail" className="" >Email</label>
                <input type="text" className="input form-control" id="staticEmail" value={user} placeholder={'Correo'} onChange={e => setUser(e.target.value)} />
              </div>
              <div style={{ width: '50%', marginLeft: '25%', marginRight: '25%' , paddingTop: '2%' }}>
                <label htmlFor="inputPassword" className="" >Password</label>
                <input type="password" className="input form-control" id="inputPassword" value={pass} placeholder={'Contraseña'} onChange={e => setPass(e.target.value)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2%' }}>
                <Button type="button" className="btn orange"  onClick={onLogIn}>Iniciar sesión</Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
