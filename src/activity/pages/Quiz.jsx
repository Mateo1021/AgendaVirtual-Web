import { useLayoutEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import './quiz.css'
import db from '../../../firebase/firebaseConfig'
import { collection, query, where, getDoc, onSnapshot, getDocs, updateDoc, doc,addDoc } from "firebase/firestore";
import { async } from '@firebase/util';
let quiz = {}
let question
let choices
let correctAnswer
let questions

const Quiz = () => {
    document.body.style.background = "linear-gradient(90.04deg, #e7aa7b 0.03%, #ffe3cd 99.96%)";
    const { codC, codA } = useParams();


    const [starGame, setstarGame] = useState(false)

    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })


    const [user, setuser] = useState({})


    const loginStud = async () => {
        const q = query(collection(db.db, "Usuarios"), where("Correo", "==", user));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            // doc.data() is never undefined for query doc snapshots
            setuser(doc.data());
            document.getElementById('logIngin').value = ''
        });
        if (querySnapshot.docs.length < 1) {
            alert('No encontramos un usuario con ese correo porfavor intenta nueva mente')
        }
    }


    const getCuestions = async () => {
        const evetRef = collection(db.db, "preguntas");
        const q = query(evetRef, where("codReg", "==", codA));
        const querySnapshot = await getDocs(q);
        let preguntasArray = []
        querySnapshot.forEach((doc) => {
            preguntasArray.push({
                question: doc.data().pregunta,
                choices: doc.data().respuestas,
                type: 'MCQs',
                correctAnswer: doc.data().respuesta,
            });

        });
        console.log(preguntasArray);


        quiz = {
            topic: 'Javascript',
            level: 'Beginner',
            totalQuestions: preguntasArray.length,
            perQuestionScore: 5,
            questions: preguntasArray,
        }

        questions = quiz.questions

        question = questions[activeQuestion].question
        choices = questions[activeQuestion].choices
        correctAnswer = questions[activeQuestion].correctAnswer


        const docRef = doc(db.db, "registrosForo", codA);
        const docSnap = await getDoc(docRef);
        let arrayTemp = docSnap.data().participacion

        if (arrayTemp.indexOf(user.codUser) < 0) {
            setstarGame(true)
        } else {
            alert('Tu ya realizaste esta actividad')
        }


    }

    if (activeQuestion > 0) {
        question = questions[activeQuestion].question
        choices = questions[activeQuestion].choices
        correctAnswer = questions[activeQuestion].correctAnswer
    }

    const onClickNext = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 5,
                    correctAnswers: prev.correctAnswers + 1,
                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)

        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }


    const addPointUser = async () => {

        const userRef = doc(db.db, "Usuarios", user.codUser);
        let newValor = Number(user.Puntaje) + Number(result.score)
        await updateDoc(userRef, {
            Puntaje: newValor.toString()
        });

        const docRef = doc(db.db, "registrosForo", codA);
        const docSnap = await getDoc(docRef);
        let arrayTemp = docSnap.data().participacion
        arrayTemp.push(user.codUser)
        await updateDoc(docRef, {
            participacion: arrayTemp
        });


        const rankRef = await addDoc(collection(db.db, "rankingActividades"), {
            codReg: codA,
            nombreUser: user.Nombres,
            puntaje:result.score
          });

        setstarGame(false)
        window.location.reload();
    }


    const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
    if (starGame) {

        return (

            <div className="bodyQuiz">
                <div className="quiz-container bodyQuiz">
                    {!showResult ? (
                        <div>
                            <div>
                                <span className="active-question-no">
                                    {addLeadingZero(activeQuestion + 1)}
                                </span>
                                <span className="total-question">
                                    /{addLeadingZero(questions.length)}
                                </span>
                            </div>
                            <h2>{question}</h2>
                            <ul>
                                {choices.map((answer, index) => (
                                    <li
                                        onClick={() => onAnswerSelected(answer, index)}
                                        key={answer}
                                        className={
                                            selectedAnswerIndex === index ? 'selected-answer' : null
                                        }>
                                        {answer}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex-right">
                                <button
                                    onClick={onClickNext}
                                    disabled={selectedAnswerIndex === null}>
                                    {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="result">
                            <h3>Resutlados</h3>
                            <p>
                                Total Preguntas: <span>{questions.length}</span>
                            </p>
                            <p>
                                Total Score:<span> {result.score}</span>
                            </p>
                            <p>
                                Preguntas Correcta:<span> {result.correctAnswers}</span>
                            </p>
                            <p>
                                Preguntas incorrectas:<span> {result.wrongAnswers}</span>
                            </p>
                            <button
                                onClick={addPointUser}>
                                Finalizar y enviar respuestas
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="bodyQuiz">
                <div className="quiz-container">
                    <h1>Bienvenido</h1>
                    <input type={'text'}
                        onChange={(e) => setuser(e.target.value)}
                        id='logIngin'
                        className="form-control"
                    >

                    </input>
                    <button className='mb-3'
                        onClick={() => loginStud()}
                    > Login </button>
                    <p>Este es tu usuario... {user.Nombres}  ?</p>
                    <p>Tu puntaje actual es de... {user.Puntaje} </p>
                    <button
                        onClick={() => getCuestions()}
                    > Empeza juego </button>
                </div>
            </div>
        )

    }
}

export default Quiz