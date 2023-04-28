//Questa versione usa una funzione (cioè un componente)
import React, { useEffect, useState} from "react"
import axios from 'axios'

const ListaCommenti = function() {
    // creo lo state per i commenti e per l'errore
    const [commenti, setCommenti] = useState([])
    const [errore, setErrore] = useState(null)

   
    // funzione per recupero dei commenti
    const fetchData = async (nrComm) =>{
        try {
            const url = 'https://jsonplaceholder.typicode.com/comments/'+nrComm  //inserendo un numero si riceve solo quel commento, altrimenti 500 commenti

            const res = await axios.get(url)   // ritorna direttamwente il response

            const appoggio = Array.isArray(res.data) ? res.data : [res.data]
            setCommenti(appoggio)
        } catch (err) {
            setErrore(err.message)
        }

    }

    // uso i side effect (hook useEffect)
    useEffect(() => {

        // faccio il fetching dei dati
        const nrComm = ''
        fetchData(nrComm)

    }, []) //se dovessi usare delle variabilik di state all'interno della funzione semplicemente le elenco nelle parentesi quadre
   
    if (errore) {
        return (<>
            <h2>Lista commenti</h2>
            <p>{errore}</p>
        </>
        )
    }
    return(  <>
    <h2>Lista commenti Versione Funzione</h2>
        <ul>
            {
                commenti.map((item, key) => {

                    return <li key={ key} style={{ border: '1px solid #c8c8c8', padding: '3px 6px', listStyle: 'none', marginBottom: '5px', borderRadius: '6px', textAlign: 'left'}}>
                        <p>id: {item.id}</p>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        <p>{item.body}</p>
                        </li>
                })
            }
        </ul>
        </>
    )
}

export default ListaCommenti