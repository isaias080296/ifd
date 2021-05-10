var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require('morgan');


const mongoose = require('mongoose');




// Just add bluebird to your package.json, and then the following line should work
mongoose.Promise = require('bluebird');

 mongoose.connect('mongodb+srv://Isaias:Atlixco1234@cluster0.mxvw9.mongodb.net/fcr');



 const schema= mongoose.Schema({
    email: {type: String},
    phone: {type: String},
    description: {type:String},


})


const User = mongoose.model("User", schema);


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

app.post("/add", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.sendFile(__dirname + "/atencion.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))