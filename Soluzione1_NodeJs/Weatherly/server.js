'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);


// importa i 3 moduli; per installarsi da riga comandi: npm install --save express body-parser request
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var debug = require('debug')('my express app');
var path = require('path');
const xml2js = require('xml2js');


// crea un oggetto di classe express denominato app
const app = express();

/* apikey weather https://home.openweathermap.org/ per mio utente kataw12@aruba.it greiz23_aruba */
const apiKey = '191390e61ceb841252af561af5b09c49';

// ci servirà per accedere il file CSS all'interno del folder public 
app.use(express.static(path.join(__dirname, 'public')));

// per accedere al body della request
app.use(bodyParser.urlencoded({extended:true}));

// imposta il motore per template EJS (Embedded JavaScript) - E' un linguaggiodi templating; lo installiamo con: npm install --save ejs
// di default EJS usa la cartella "views" ed il file "index.ejs"
app.set('view engine', 'ejs');

// usa il metodo get per renderizzare il file index.ejs (front-end HTML) come response
app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
})

// usa i lmetodo POST per richiedere al server le condizioni meteo di una specifica località
app.post('/', function (req, res) {

    // memorizza la città prendendola dal body della request
    let city = req.body.city;
    let format = req.body.format;

    // memorizza in url la chiamata alla  API passando la city e la nostra apiKey
    //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    var url = '';
    if (format == 'xml') {
         url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&mode=xml`
    } else {
         url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    }
    
    console.log(req.body.city)

    // invia la request e controlla se c'è un errore lo visualizza mediante il rendering di index.ejs
    // altrimenti visualizza le condizioni meteo di risposta (sempre renderizando index.ejs)
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Errore, si prega di riprovare' });
        } else {

            if (format === 'xml') {
                

                const parser = new xml2js.Parser();
               

                parser.parseString(body, function (error, results) {
                    if (error === null) {
                        let tempo = JSON.stringify(results);
                        let weather = JSON.parse(tempo);
                        if (weather.current == undefined) {
                            res.render('index', { weather: null, error: 'Errore, non trovato nulla nel JSON di risposta; si prega di riprovare' });
                        } else {
                            let weatherText = `It's ${weather.current.temperature[0].$.value} degrees with ${weather.current.weather[0].$.value} in ${weather.current.city[0].$.name}! `;
                            res.render('index', { weather: weatherText, error: null });
                            console.log("body:", body)
                        }

                    } else {
                        res.render('index', { weather: null, error: 'Errore, non trovato nulla nel JSON di risposta; si prega di riprovare' });
                    }
                });
            } else {
                let weather = JSON.parse(body)

                if (weather.main == undefined) {
                    res.render('index', { weather: null, error: 'Error, please try again' });
                } else {
                    let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].main} in ${weather.name}!`;
                    res.render('index', { weather: weatherText, error: null });
                    console.log("body:", body)
                }

            }
            
        }
    });
})

//imposta l'applicazione in ascolto sulla porta 3000 e visualizza un msg nella console
app.listen(3000, function () {
    console.log("Weatherly app in ascolto su porta 3000")
})


