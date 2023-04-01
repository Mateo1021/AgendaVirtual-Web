import React, { useState } from 'react'
import { async } from '@firebase/util';
import db from '../../../firebase/firebaseConfig'
import { collection, query, where, getDoc, onSnapshot, getDocs, updateDoc, doc ,addDoc} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { GrFormRefresh } from "react-icons/gr";

export const Ahorcado = () => {
    document.body.style.background = "linear-gradient(90.04deg, #e7aa7b 0.03%, #ffe3cd 99.96%)";

    const { codC, codA } = useParams();

    const [user, setuser] = useState('')
    const [userInfo, setuserInfo] = useState([])
    const [isLogin, setisLogin] = useState(false)

    const [pistas, setpistas] = useState([])
    const [idPista, setidPista] = useState(0)



    const [idPalabra, setidPalabra] = useState(0)

    const [palabraServ, setpalabraServ] = useState([])


    const [intento, setintento] = useState('')
    const [palabraSeleccionada, setpalabraSeleccionada] = useState('')
    const [letrasAdivinadas, setletrasAdivinadas] = useState([])

    const [intentosRestantes, setintentosRestantes] = useState(6)


    const [update, setupdate] = useState(true)



    const [isDisable, setisDisable] = useState(true)



    const [score, setscore] = useState(0)
    /*     const [palabraSelect, setpalabraSelect] = useState('')
     */

    const loginUser = async () => {
        const q = query(collection(db.db, "Usuarios"), where("Correo", "==", user));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            // doc.data() is never undefined for query doc snapshots
            setuserInfo(doc.data());
            document.getElementById('logIngin').value = ''
        });
        if (querySnapshot.docs.length < 1) {
            alert('No encontramos un usuario con ese correo porfavor intenta nueva mente')
        }
    }

    const starGame = async () => {
        const evetRef = collection(db.db, "preguntasAhoracodo");
        const q = query(evetRef, where("codRegistro", "==", codA));
        const querySnapshot = await getDocs(q);
        let palabrasArray = []
        querySnapshot.forEach((doc) => {
            palabrasArray.push({
                palabra: doc.data().palabra.toLowerCase(),
                pistas: doc.data().pistas,
            });
            setpalabraServ(palabrasArray)
        });





        setpistas(palabrasArray[idPalabra].pistas)
        setpalabraSeleccionada(palabrasArray[idPalabra].palabra)

        console.log(userInfo);

        if (userInfo.Correo) {
            const docRef = doc(db.db, "registrosForo", codA);
            const docSnap = await getDoc(docRef);
            let arrayTemp = docSnap.data().participacion
            console.log(arrayTemp);
            if (arrayTemp.indexOf(userInfo.codUser) < 0) {
                setisLogin(true)
            } else {
                alert('Tu ya realizaste esta actividad')
            }
        } else {
            alert('Por favor ingresa tu usuario promero para poder darte los puntos al finalizar ')
        }
    }



    function SelectPalabra() {

        let newid = idPalabra + 1
        if (newid <= palabraServ.length - 1) {
        setidPista(0)
        setletrasAdivinadas([])

        console.log(newid);
        console.log(palabraServ.length - 1);

            setidPalabra(newid)
            setpistas(palabraServ[newid].pistas)
            setpalabraSeleccionada(palabraServ[newid].palabra)
            console.log(palabraServ[newid].palabra);
            setisDisable(true)
        } else {
            let scoreNew = score + 1
            setscore(scoreNew)
            setPuntosUser()
        }
    }


    function verificarLetra() {
        let letra = intento.toLowerCase()
        console.log(letra);
        if (palabraSeleccionada.includes(letra)) {
            // Si la letra está en la palabra, actualizamos la lista de letras adivinadas
            letrasAdivinadas.push(letra);
            setletrasAdivinadas(letrasAdivinadas)
            document.getElementById('intento').value = ''
        } else {
            // Si la letra no está en la palabra, disminuimos el número de intentos restantes
            let newVal = intentosRestantes - 1;
            if (newVal < 0) {
                console.log('cero int');
                setisDisable(false)
            } else {
                setintentosRestantes(newVal)
            }
            document.getElementById('intento').value = ''
        }
        let palabraMostrada = '';
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (letrasAdivinadas.includes(palabraSeleccionada[i])) {
                palabraMostrada += palabraSeleccionada[i];
            } else {
                palabraMostrada += '_';
            }
        }
        if (palabraSeleccionada == palabraMostrada) {
            setisDisable(false)
            let newValScore = score + 4
            setscore(newValScore)
        }

        setupdate(!update)
    }

    function MostrarPalabra() {
        let palabraMostrada = '';
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (letrasAdivinadas.includes(palabraSeleccionada[i])) {
                palabraMostrada += palabraSeleccionada[i];
            } else {
                palabraMostrada += '_';
            }
        }
        if (palabraSeleccionada == palabraMostrada) {
            /*             setisDisable(true) */
            palabraMostrada = ''
            let newid = idPalabra + 1
            console.log(newid, palabraSeleccionada, palabraMostrada);
            /*            setidPalabra(newid) */
            return (
                <div>
                    <h1>Bien hecho</h1>
                </div>);
        } else {
            return (
                <div>
                    <h1>{palabraMostrada}</h1>
                </div>);
        }




    }

    function MostrarIntentos() {

        return (
            <div>
                <p>
                    Te quedan {intentosRestantes} intentos
                </p>
            </div>
        )
    }

    function generateNumber() {
        let newIdPist = idPista + 1
        setidPista(newIdPist)
    }

    function ShowPista() {

        return (
            <div style={{display:'flex', alignItems:'center'}}>
                <h1>Pista: {pistas[idPista]}</h1>
                <GrFormRefresh onClick={generateNumber} size={40}></GrFormRefresh>
            </div>
        )
    }


    async function setPuntosUser() {



        const userRef = doc(db.db, "Usuarios", userInfo.codUser);
        let newValor = Number(userInfo.Puntaje) + Number(score)
        await updateDoc(userRef, {
            Puntaje: newValor.toString()
        });

        const docRef = doc(db.db, "registrosForo", codA);
        const docSnap = await getDoc(docRef);
        let arrayTemp = docSnap.data().participacion
        arrayTemp.push(userInfo.codUser)
        await updateDoc(docRef, {
            participacion: arrayTemp
        });


        const rankRef = await addDoc(collection(db.db, "rankingActividades"), {
            codReg: codA,
            nombreUser: userInfo.Nombres,
            puntaje:score
          });

        setisLogin(false)
        window.location.reload();



    }

    if (!isLogin) {
        return (
            <>
                <div className='contLogAh'>
                    <div className='divContAh'>
                        <p>Correo</p>
                        <input className="form-control" type={'email'} onChange={(e) => setuser(e.target.value)} id='logIngin'></input>

                        <button className="btn orange mt-3" onClick={loginUser}>
                            Login
                        </button>
                        <p className="mt-3">
                            usuario: {userInfo.Nombres}
                        </p>
                        <button
                            className="btn orange"
                            onClick={starGame}
                        >play game</button>
                    </div>
                </div>
            </>

        )
    } else {
        return (
            <div className='contActAh'>
                <div className='divContAh'>
                    <ShowPista></ShowPista>
                    <MostrarPalabra></MostrarPalabra>
                    <input
                        type={'text'}
                        onChange={(e) => setintento(e.target.value)}
                        id='intento'
                        disabled={!isDisable}
                        maxLength='1'
                        className="form-control inputStyleAh"
                    >
                    </input>
                    <button
                        className="btn orange mt-3"
                        onClick={verificarLetra}
                        disabled={!isDisable}
                    >
                        Validar
                    </button>
                    <MostrarIntentos></MostrarIntentos>

                    <button
                        className="btn orange"
                        onClick={SelectPalabra}
                        disabled={isDisable}
                    >
                        Siguiente palabra
                    </button>

                    <p>tu puntaje es: {score}</p>
                    <button
                        className="btn orange mb-2 px-5"
                        onClick={setPuntosUser}
                    >
                        finalizar
                    </button>
                    <p>Si finalizas la actividad antes de terminar no podras volverlo a intentar</p>
                </div>
            </div>
        )
    }

}
