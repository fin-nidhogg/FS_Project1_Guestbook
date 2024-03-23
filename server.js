///////////////////////////////////////////////////
// Geneeriset importit
///////////////////////////////////////////////////

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require("fs");


///////////////////////////////////////////////////
// Luodaan express sovellus
///////////////////////////////////////////////////

const app = express();

///////////////////////////////////////////////////
// Siirretään myöhemmin dotenviin
///////////////////////////////////////////////////

const PORT = 3100;
var data = require("./public/data/data.json")

///////////////////////////////////////////////////
// Middlewaret
///////////////////////////////////////////////////

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
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
        res.send('Please fill in all fields! <a href="/newmessage">Back to Form</a>', 400);
        return;
    } else {
        saveData(req);
        res.send('Data received successfully! <a href="/guestbook">Back to frontpage</a>', 200);
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
            res.send('Please fill in all fields', 400);
            return;
        }
        else {
            saveData(req);
            console.log("Dataa tulloopi");
            res.send('Data received successfully!', 200);
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
    res.send("Error 404: Cannot find the requested page", 404)
});

///////////////////////////////////////////////////
// Potkaistaan palvelin käyntiin kuunnellen määriteltyä porttia
///////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`)
});

