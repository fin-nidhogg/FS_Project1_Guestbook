///////////////////////////////////////////////////
// Geneeriset importit
///////////////////////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");
var data = require("./public/data/data.json")

///////////////////////////////////////////////////
// Aplikaatio kohtaiset asetukset
// Siirretään myöhemmin dotenviin
///////////////////////////////////////////////////

const PORT = 3100;

///////////////////////////////////////////////////
// Luodaan express sovellus
///////////////////////////////////////////////////

const app = express();

///////////////////////////////////////////////////
// Middlewaret
///////////////////////////////////////////////////

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Asetetaan view engineksi EJS
app.set("view engine", "ejs");

///////////////////////////////////////////////////
// Funktio formin tietojen tallennukseen
///////////////////////////////////////////////////

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
///////////////////////////////////////////////////
// Reitti etusivun näkymään
///////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.render("./pages/home")
    console.log(req.path)
});

///////////////////////////////////////////////////
// Reitti viestien listaukseen
///////////////////////////////////////////////////

app.get("/guestbook", (req, res) => {
    res.render("./pages/guestbook", { entries: data });
    console.log(req.path)
});

///////////////////////////////////////////////////
// Reitti JSON muotoiseen dataan
///////////////////////////////////////////////////

app.get("/entries", (req, res) => {
    res.send(JSON.stringify(data));
});

///////////////////////////////////////////////////
// Reitti formiin uuden viestin lisäämiseksi
///////////////////////////////////////////////////

app.get("/newmessage", (req, res) => {
    res.render("./pages/newmessage")
    console.log(req.path)
});

///////////////////////////////////////////////////
// Käsitellään formilta tulevaa POST dataa
///////////////////////////////////////////////////

app.post("/newmessage", (req, res) => {
    if (req.body.username === "" || req.body.country === "" || req.body.message === "") {
        res.status(400).send('Please fill in all fields! <a href="/newmessage">Back to Form</a>');
        return;
    } else {
        saveData(req);
        res.status(200).send('Data received successfully! <a href="/guestbook">Back to frontpage</a>');
    }
});

///////////////////////////////////////////////////
// Route AJAX Formille
///////////////////////////////////////////////////

app.get("/ajaxmessage", (req, res) => {
    res.render("./pages/ajaxmessage")
    console.log(req.path)
});

///////////////////////////////////////////////////
// Käsitellään formilta tulevaa POST dataa. 
// Palautetaan statuskoodi 200 jos kaikki ok, muuten 400
///////////////////////////////////////////////////

app.post("/newajaxmessage", (req, res) => {
    try {
        if (req.body.username === "" || req.body.country === "" || req.body.message === "") {
            res.status(400).send('Please fill in all fields');
            return;
        }
        else {
            saveData(req);
            console.log("Dataa tulloopi");
            res.status(200).send('Data received successfully!');
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
});
///////////////////////////////////////////////////
// Jollei pyydettyä routea löyty, palautetaan virheilmoitus
///////////////////////////////////////////////////

app.get("*", (req, res) => {
    res.status(404).send("Error 404: Cannot find the requested page");
});

///////////////////////////////////////////////////
// Potkaistaan palvelin käyntiin kuunnellen määriteltyä porttia
///////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT} \nYou can access the app at http://localhost:${PORT}`)
});

