//Moduuleja
const PORT = process.env.PORT || 8083; //Portti
var http = require("http");
var fs = require('fs');
var express = require("express");
var app = express();    //express-moduuli
var path = require('path');

//Bodyparser käyttöön POST-tyyppisten lomakkeiden asiointiin.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Polut

//kun url on '/' eli default
app.use(express.static(path.join(__dirname, 'public')));

//JSON-tiedosto, joka näytetään html tauluna
app.get("/guestbook", function (req, res) {
    /*var data = require('./guestbookdata.json'); //json taulu
    var taulu = '<table class="table"><thead><th>username</th><th>country</th><th>date</th><th>message</th></thead><tbody>';
    for (var i = 0; i < data.length; i++) {
        taulu += '<tr>' +
            '<td>' + data[i].username + '</td>' +
            '<td>' + data[i].country + '</td>' +
            '<td>' + data[i].date + '</td>' +
            '<td>' + data[i].message + '</td>' +
            '<tr>';
    }
    taulu += '</tbody></table>'*/
    res.sendFile(__dirname + '/public/guestbook.html');
    //res.send(taulu);
});

//POST toiminto newmessage
app.post("/newmessage", function (req, res) {
    var data = require('./public/guestbookdata.json'); //json taulu
    console.log(req.body);
    var username = req.body.username;
    var country = req.body.country;
    var message = req.body.message;
    var date = new Date;
    var linkkiTakaisin = `
    <div class="container-lg">
        <div class="row">
            <div class="col">
                <h2><a href="index.html">Home</a></h2>
            </div>
            <div class="col">
                <h2><a href="guestbook.html">Guestbook</a></h2>
            </div>
            <div class="col">
                <h2><a href="newmessage.html">newmessage</a></h2>
            </div>
            <div class="col">
                <h2><a href="ajaxmessage.html">ajaxmessage</a></h2>
            </div>
        </div>
    </div>
    `;

    //validaatio
    if (username.length < 4 || country.length < 3 || message.length < 3) {
        res.send("ERROR <br>See to that username is longer than 4 letters, country 3 letters and message 3.")
    }
    else {
        //JSON tiedostoomme lisätään käyttäjän syötteet
        data.push({
            "username": username,
            "country": country,
            "date": date,
            "message": message
        });
        //json tieto string
        var jsonStr = JSON.stringify(data);
        //json-string kirjoitetaan tiedostoon
        fs.writeFile('./public/guestbookdata.json', jsonStr, (err) => {
            if (err) throw err;
        });
        //Tämä tulee esiin web selaimeen
        res.send("Lomake lähetetty onnistuneesti! <br>Username: " + username + " <br>Country: " + country + " <br>Message: " + message + "<br>" + linkkiTakaisin);
    }
});

//FORM-tyyppinen sivu, joka tallentaa JSON-tiedostoon
app.get("/newmessage", function (req, res) {
    res.sendFile(__dirname + '/public/newmessage.html');
});

//POST- toiminto, joka palauttaa käyttäjän lähettämän syötteen ja vastaan ottaa sen AJAX kautta
app.post("/ajaxmessage", function (req, res) {
    var data = require('./public/guestbookdata.json'); //json taulu
    console.log(req.body);
    var username = req.body.username;
    var country = req.body.country;
    var message = req.body.message;
    var date = new Date;
    //json tiedostoomme lisätään käyttäjän syötteet
    data.push({
        "username": username,
        "country": country,
        "date": date,
        "message": message
    });
    //json tieto string
    var jsonStr = JSON.stringify(data);
    //json-string kirjoitetaan tiedostoon
    fs.writeFile('./public/guestbookdata.json', jsonStr, (err) => {
        if (err) throw err;
    });

    //Taulukon muodostos web selaimeen
    var taulu = '<table class="table"><thead><th>username</th><th>country</th><th>date</th><th>message</th></thead><tbody>';
    for (var i = 0; i < data.length; i++) {
        taulu += '<tr>' +
            '<td>' + data[i].username + '</td>' +
            '<td>' + data[i].country + '</td>' +
            '<td>' + data[i].date + '</td>' +
            '<td>' + data[i].message + '</td>' +
            '<tr>';
    }
    taulu += '</tbody></table>'
    //Tämä tulee esiin web selaimeen, Ei päivitä sivua
    res.send("<h1>Onnestuneesti lomake lähetetty! Alla JSON data</h1><br>" + taulu);
});

//ajax-pyyntö backendiin ja sitten tulostus sivulle.
app.get("/ajaxmessage", function (req, res) {
    res.sendFile(__dirname + '/public/ajaxmessage.html');
});

//Web-palvelin
app.listen(PORT, function () {
    console.log("Portti avattu, serveri pystyssä: " + PORT);
});

