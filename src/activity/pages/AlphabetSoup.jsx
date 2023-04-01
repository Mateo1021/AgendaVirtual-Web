import React, { useEffect } from 'react'
import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';



export const AlphabetSoup = () => {

    const { codC, codA } = useParams();

    const [user, setuser] = useState('')





    const [sopaLetras, setsopaLetras] = useState([])






    function RenderSoup() {

        return (
            <div>

            </div>
        )

    }


    return (
        <div>

            {sopaLetras.map((id) => {
                <div><h1>1</h1></div>
            }
            )}
            aaaa
        </div>
    )
}
