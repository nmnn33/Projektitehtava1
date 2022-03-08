//Moduuleja
const PORT = process.env.PORT || 8083; //Portti
var http = require("http");
var express = require("express");
var app = express();    //express-moduuli

//Polut

app.use(express.static("./edulab"));   //HTML-sivu expressin kautta, hakee juuri hakemistosta

app.get("/guestbook", function (req, res) {
    res.send("guest!");
});

app.get("/newmessage", function (req, res) {
    res.send("messa!");
});

app.get("/ajaxmessage", function (req, res) {
    res.send("ajax!");
});

//Web-palvelin
app.listen(PORT, function () {
    console.log("Portti 8083 avattu, serveri pystyssä");
});

