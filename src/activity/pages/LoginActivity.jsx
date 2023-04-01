import React from 'react'
import { useParams } from 'react-router-dom';
import at from '../../../firebase/firebaseConfig'
import db from '../../../firebase/firebaseConfig'
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDoc, onSnapshot, getDocs } from "firebase/firestore";
import { useLayoutEffect } from 'react';
import { async } from '@firebase/util';

export const LoginActivity = () => {
  const { codC, codA } = useParams();

  const [user, setuser] = useState('')
  const [preguntas, setpreguntas] = useState([])


  return (

    <div>



    </div>

  )
}
