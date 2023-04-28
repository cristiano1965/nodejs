//Questa versione usa una classe
import React from "react"
import axios from 'axios'

class ListaCommenti extends React.Component {
    constructor(props) {
        super()
        this.state = {
            commenti: [],
            errore: null
        }
    }
    /* modo 1 : gestione della promessa con .then/.catch (cioè con catena di callback)
    componentDidMount() {
        //alert('Il componente e\' montato')
        const url = 'https://jsonplaceholder.typicode.com/comments/'  //inserendo un numero si riceve solo quel commento

       
        const axiosRequest = axios.get(url)   // ritorna una promessa in axiosRequest

        axiosRequest
            .then(res => {
                //console.log(res)

                // se chiamo un singolo commento il risultato non è un array, 
                // allora forzo la creazione di un array con 1 solo elemento con all'interno l'oggetto ricevuto
                const appoggio = Array.isArray(res.data) ? res.data : [res.data]
                this.setState({ commenti: appoggio })
            })
            .catch(err => {
                this.setState({ errore: err.message })
            })
    }
    */

    /* modo 2 : gestione della promessa con async/await, molto più semplice */
     componentDidMount() {
        //alert('Il componente e\' montato')

         const nrComm = ''
         this.fetchData(nrComm)
        
    }

    async fetchData(nrComm) {
        try {
            const url = 'https://jsonplaceholder.typicode.com/comments/'+nrComm  //inserendo un numero si riceve solo quel commento, altrimenti 500 commenti

            const res = await axios.get(url)   // ritorna direttamwente il response

            const appoggio = Array.isArray(res.data) ? res.data : [res.data]
            this.setState({ commenti: appoggio })
        } catch (err) {
            this.setState({ errore: err.message })
        }

    }

    render() {
        if (this.state.errore) {
            return (<>
                <h2>Lista commenti</h2>
                <p>{this.state.errore}</p>
            </>
            )
        }
        return(  <>
        <h2>Lista commenti Versione Classe</h2>
            <ul>
                {
                    this.state.commenti.map((item, key) => {

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
}

export default ListaCommenti