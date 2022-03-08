//Moduuleja
const PORT = process.env.PORT || 8083; //Portti
var http = require("http");
var fs = require('fs');
var express = require("express");
var app = express();    //express-moduuli
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Polut

//kun url on '/' eli default
app.use(express.static(path.join(__dirname, 'public')));

//JSON-tiedosto, joka näytetään html tauluna
app.get("/guestbook", function (req, res) {
    //index.js kautta tehty taulu, ei tarve, sillä html sisältää
    /*var data = require('./guestbookdata.json'); //json taulu
    var taulu = '<table border="2px">';
    for (var i = 0; i < data.length; i++) {
        taulu += '<tr>' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].username + '</td>' +
            '<td>' + data[i].country + '</td>' +
            '<td>' + data[i].date + '</td>' +
            '<td>' + data[i].message + '</td>' +
            '<tr>';
    }
    taulu += '</table>'
    res.send(taulu);*/
    res.sendFile(__dirname + '/public/guestbook.html');
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

