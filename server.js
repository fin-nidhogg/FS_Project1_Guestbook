// Luodaan express sovellus
const express = require("express");
const app = express();

// Filesystem käyttöön
const fs = require("fs");

// Body-parser käyttöön
const bodyParser = require("body-parser");

// Siirretään myöhemmin dotenviin
const PORT = 3100;
var data = require("./public/data/data.json")

// CORS käyttöön
const cors = require('cors');
app.use(cors());

// Staattiset sivut ja ejs käyttöön yms middlewaret
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");


// Funktio formin tietojen tallennukseen
const saveData = (req) => {
    // Haetaan data formista ja muodostetaan siitä objekti.
    var dateNow = new Date();
    var newEntry = {
        id: data.length + 1,
        username: req.body.username,
        country: req.body.country,
        date: dateNow.toString(),
        message: req.body.message
    }

    // Työnnetään uusi objekti taulukkoon joka kirjoitetaan se JSON-tiedostoon.
    data.push(newEntry);
    var dataToWrite = JSON.stringify(data, "", 1);
    fs.writeFileSync("./public/data/data.json", dataToWrite
    );
}

// Reitti etusivun näkymään
app.get("/", (req, res) => {
    res.render("./pages/home")
    console.log(req.path)
});

// Reitti viestien listaukseen
app.get("/guestbook", (req, res) => {
    res.render("./pages/guestbook", { entries: data });
    console.log(req.path)
});

// Reitti JSON muotoiseen dataan
app.get("/entries", (req, res) => {
    res.send(JSON.stringify(data));
});

// Reitti formiin uuden viestin lisäämiseksi
app.get("/newmessage", (req, res) => {
    res.render("./pages/newmessage")
    console.log(req.path)
});

// Käsitellään formilta tulevaa POST dataa
app.post("/newmessage", (req, res) => {
    saveData(req);
    res.redirect("/guestbook");
});

// Route AJAX Formille
app.get("/ajaxmessage", (req, res) => {
    res.render("./pages/ajaxmessage")
    console.log(req.path)
});

// Käsitellään formilta tulevaa POST dataa
app.post("/newajaxmessage", (req, res) => {
    saveData(req);
    console.log("Dataa tulloopi");
});

// Jollei pyydettyä routea löyty, palautetaan virheilmoitus
app.get("*", (req, res) => {
    res.send("Error 404: Cannot find the requested page", 404)
});

// Potkaistaan palvelin käyntiin kuunnellen määriteltyä porttia
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`)
});

