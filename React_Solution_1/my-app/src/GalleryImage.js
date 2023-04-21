import React from 'react'

const GalleryImage = (props) => {
    const { photos, currentIndex, changeImage } = props // destruttura  l'oggetto photos e currentIndex e changeIMage dalle props
    const current_author = photos[currentIndex].author
    const current_image = photos[currentIndex].url

    return (<>
        <p>Autore: {current_author}</p>
        <img src={current_image} />
        {/* quello sotto è un Systethic Event di React - sintatti JSX
                con (e) viene definita una funzione che riceve l'evento' e poi con => tra parentesi quadre insieriamo
                cosa dovrà fare la funzione */}
        <button name='CambiaImmagine' onClick={changeImage} style={{ display: 'block' }}>Prossima immagine</button>
    </>
    )
}

export default GalleryImage