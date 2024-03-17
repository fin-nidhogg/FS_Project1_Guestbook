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

// Staattiset sivut ja ejs käyttöön
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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

// Reitti formiin uuden viestin lisäämiseksi
app.get("/newmessage", (req, res) => {
    res.render("./pages/newmessage")
    console.log(req.path)
});

// Käsitellään formilta tulevaa dataa
app.post("/newmessage", (req, res) => {
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
    res.redirect("/guestbook");
});

// Route AJAX Formille
app.get("/ajaxmessage", (req, res) => {
    res.send("ajax message")
    console.log(req.path)
});

// Jollei pyydettyä routea löyty, palautetaan virheilmoitus
app.get("*", (req, res) => {
    res.send("Error 404: Cannot find the requested page", 404)
});

// Potkaistaan palvelin käyntiin kuunnellen määriteltyä porttia
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`)
});