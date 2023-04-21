import logo from './logo.svg';
import React from 'react'
import './App.css';
import GalleryImage from './GalleryImage'
import initialState from './data'

class App extends React.Component {

    // il costruttore viene richiamato all'inizializzaxione del componente
    constructor() {
        super()
        this.state = initialState
    }

    // binding dei metodi
    changeImage = this.changeImage.bind(this)
    //renderGalleyImage = this.renderGalleyImage.bind(this)

    changeImage(e) {
        //console.log('da change image:' + e._reactName)
        //console.log(this.state.currentIndex)

        //sposta ad immagine successiva aggiornando currentIndex di state (+1)
        if (this.state.currentIndex >= this.state.photos.length - 1)
            this.setState({ currentIndex: 0 })
         else
            this.setState({ currentIndex: this.state.currentIndex += 1 })
    }

    

    render() {
        //console.log(this.state.photos[0].url)

        const { photos, currentIndex } = this.state // destruttura solo l'oggetto photos e currentIndex dallo state

        return (
            <div style={{ width: '480px', margin: 'auto', border: '1px solid' }}className="App">
                {/*Hello {this.state.name}*/}
                <GalleryImage
                    photos={photos}
                    currentIndex={currentIndex}
                    changeImage={this.changeImage} />
            </div>
        );
    }
}
export default App;
