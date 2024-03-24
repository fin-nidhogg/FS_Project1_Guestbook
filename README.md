FullStack **Projektiraportti**

# Sisällysluettelo

[1 Yleistä tietoa projektista](#yleistä-tietoa-projektista)  
[2 Käytettyjä tekniikoita ja erikoisuuksia](#käytettyjä-tekniikoita-ja-erikoisuuksia)  
[3 Sivuston design ja rakenne](#sivuston-design-ja-rakenne)  
[4 Oma arvio työstä ja oman osaamisen kehittymisestä](#oma-arvio-työstä-ja-oman-osaamisen-kehittymisestä)  
[5 Palaute opettajalle kurssista sekä itse opetuksesta tähän saakka](#palaute-opettajalle-kurssista-sekä-itse-opetuksesta-tähän-saakka)  
[6 Linkit](#linkit)  
[6.1 Verkkosivuni osoite](#verkkosivuni-osoite)  
[6.2 Linkki GitHub repositorioon](#linkki-github-repositorioon)  
[6.3 Linkki projektin videoesitykseen](#linkki-projektin-videoesitykseen)

# Yleistä tietoa projektista

Projektin tarkoituksena oli luoda yksinkertainen vieraskirja hyödyntäen
node.js:ää sekä express ohjelmistokehystä. Käytännössä sovellus
tarjoilee kävijälle mahdollisuuden jättää viestejä, jotka tallennetaan
lomakkeenkäsittelijällä tiedostoon JSON-muodossa. Nämä viestit sitten
näytetään kävijöille tyyliteltynä html-taulukkona.

# Käytettyjä tekniikoita ja erikoisuuksia

Kuten aikaisemmin totesin, projektissa on käytetty tekniikoita. Runkona
node.js jonka päällä puhdasta javascriptiä sekä expressin tuomia
helpottavia funktioita. Lisäksi käyttöliittymässä on hyödynnetty
bootstrappia. Erikoisuuksia projektista ei tällä mittakaavalla kovin
paljoa löydy. Ainoat isommat erikoisuudet tämän tason harjoitukselle
löytyvät ns. expressin tarjoamien näkymien (views) ja osien (partials)
hyödyntämisenä. Nämä tarjoavat oivan tavan tehdä pienempiä uudelleen
käytettäviä komponentteja, jolloin koodin toisto vähenee merkittävästi.

# Sivuston design ja rakenne

Halusin, että verkkosivuni olisi suhteellisen simppeli mutta tehokas.
Käyttöliittymä nojaa siksi vahvasti valmiiseen bootstrap -kirjastoon,
joka saa jokaiselle sivulle yhteneväisen käyttökokemuksen.

Sivusto koostuu neljästä käyttäjälle näkyvästä polusta, joita on
seuraavasti:

**/ - Backend** lähettää selaimelle home.ejs templaten tiedot html
muotoisena.

**/guestbook** - Backend hakee datan julkisesta JSON-tiedostosta ja
lähettää sen guestbook ejs templatelle parsittavaksi käyttäjälle
nätimpään muotoon.

**/newmessage** – Backend hakee newmessage.ejs templaten tiedot ja
tulostaa käyttäjälle formin. Formin tiedot lähetään backendille
käsiteltäväksi saman nimiseen post routeen. Datan vastaanoton yhteydessä
backend tarkastaa onko käyttäjä varmasti täyttänyt kaikki tiedot. Mikäli
kaikki kentät on täytetty, tallennetaan tiedot data.json -tiedostoon.

**/ajaxnewmessage** – Muutoin sama kuin aikaisempi polku, mutta
lomakkeen alle haetaan olemassa olevat vieraskirjan merkinnät
AJAX-kutsulla. Samoin lomakkeen tiedot lähetetään AJAX-kutsulla
backendille joka tarkistaa jälleen lähetetyt tiedot. Tiedot myös
tarkistetaan jo selaimen päässä ennen lähetystä.

# Oma arvio työstä ja oman osaamisen kehittymisestä

Mielestäni onnistuin saavuttamaan tehtävänannon mukaiset
oppimistavoitteet sekä projektini lopputulos täyttää suurimmilta osin
vaatimukset. (Osittain ylikin)

Koodi voisi paikoitellen olla hieman selkeämmin jäsenneltyä sekä
kommentointi yhdenmukaisempaa. Annetussa ajassa ei kuitenkaan aivan
kaikkiin yksityiskohtiin kykene muiden opintojen ohella keskittymään,
joten on melko varmaa, että joitakin bugeja tai ajatusvirheitä on
saattanut projektiin lipsahtaa. Raportointi on myös yksi osa-alue, jota
varmastikin tulisi harjoitella vielä enemmän. (Tai ainakaan ei pitäisi
kirjoittaa keskellä yötä kuten nyt)

Node.js on ollut minulle täysin uusi tuttavuus, joten omaksuttavaa on
ollut todella paljon. Olen oppinut projektin aikana todella paljon mm.
npm pakettienhallinnasta, Node.js ekosysteemistä sekä kehittämisestä,
reitityksestä, MVC-mallista, middlewaresta ja lista vain jatkuu. Nälkä
kasvaa syödessä ja herkästi palaan aina express:in tai node.js:än
dokumentaation kimppuun.

Antaisin itselleni tehtävästä 10/10 p

# Palaute opettajalle kurssista sekä itse opetuksesta tähän saakka

Kurssin opetustilanteet ovat nopeatempoisia mutta opetustyyli on todella
miellyttävä. Tallenteisiin on helppo palata takaisin, sillä luennot ovat
hyvin loogisesti koostettuja ja siten haluamaansa materiaaliin pääsee
melko helposti kiinni!

Harmillista ettei laurean videopalvelu mahdollista ns. timestamppien
luomista tärkeimpien kohtien osalta, tämä helpottaisi hakua entisestään.

Opettajan opetustavalle tyypillisesti ohjaus on ollut riittävää, joskin
sopivilla tiedonmuruilla tarjoiltua kannustusta itsenäiseen
ongelmanratkaisuun.

# Linkit

## Verkkosivuni osoite

https://fs-project1-guestbook.onrender.com  

Huomioithan, että sovellus on julkaistu render -alustalle ilmaisella
planilla ja se saattaa ”hibernoida”. Toisin sanoen palvelu ei vastaa
ehkä välittömästi vaan lataamiseen voi mennä jopa minuutti, riippuen
hieman palvelimen ruuhkasta.

## Linkki GitHub repositorioon

https://github.com/fin-nidhogg/FS_Project1_Guestbook

## Linkki projektin videoesitykseen

https://video.laurea.fi/media/TO00BS65-3006+Full+Stack+-+Vieraskirja/0_zyjhwnj0
