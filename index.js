//Moduuleja
const PORT = process.env.PORT || 8083; //Portti
var http = require("http");
var express = require("express");
var app = express();    //express-moduuli
var path = require('path');

//Polut

//kun url on '/' eli default
app.use(express.static(path.join(__dirname, 'public')));

//JSON-tiedosto, joka näytetään html tauluna
app.get("/guestbook", function (req, res) {
    res.sendFile(__dirname + '/public/testi.html')
});

//FORM-tyyppinen sivu, joka tallentaa JSON-tiedostoon
app.get("/newmessage", function (req, res) {
    res.send("messa!");
});

//ajax-pyyntö backendiin ja sitten tulostus sivulle.
app.get("/ajaxmessage", function (req, res) {
    res.send("ajax!");
});

//Web-palvelin
app.listen(PORT, function () {
    console.log("Portti avattu, serveri pystyssä: " + PORT);
});

