var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    CallID: String,
    SD: String,
    State: String,


});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/dependencias/marco_normativo.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/marco_normativo.html");
});

app.get("/dependencias/atribuciones.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/atribuciones.html");
});

app.get("/dependencias/script.js", (req, res) => {
    res.sendFile(__dirname + "/dependencias/script.js");
});

app.get("/dependencias/style.css", (req, res) => {
    res.sendFile(__dirname + "/dependencias/style.css");
});


app.get("/dependencias/acerca_de.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/acerca_de.html");
});

app.get("/dependencias/marco_normativo.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/marco_normativo.html");
});

app.get("/dependencias/directorio.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/directorio.html");
});


app.get("/dependencias/organigrama.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/organigrama.html");
});

app.get("/dependencias/contacto.html", (req, res) => {
    res.sendFile(__dirname + "/dependencias/contacto.html");
});


/////////////////////////////////////////Jefaturas
app.get("/jefaturas/bienestaryfamiliar.html", (req, res) => {
    res.sendFile(__dirname + "/jefaturas/bienestaryfamiliar.html");
});

app.get("/jefaturas/juridica.html", (req, res) => {
    res.sendFile(__dirname + "/jefaturas/juridica.html");
});

app.get("/jefaturas/psicologia.html", (req, res) => {
    res.sendFile(__dirname + "/jefaturas/psicologia.html");
});

app.get("/jefaturas/rehabilitacion.html", (req, res) => {
    res.sendFile(__dirname + "/jefaturas/rehabilitacion.html");
});


//////////////////////////////////Noticias


app.get("/noticias/noticias.html", (req, res) => {
    res.sendFile(__dirname + "/noticias/noticias.html");
});


///////// Atnecion ciudadana 

app.get("/atencion.html", (req, res) => {
    res.sendFile(__dirname + "/atencion.html");
});








app.get("/images", (req, res) => {
    res.sendFile(__dirname + "/images/Logo.png");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});