# Solidabiksen koodihaaste

Ruokarähinähaasteessa erilaiset ruoat mittelevät keskenään kaksintaisteluissa. Taistelujen statsit määräytyvät ruokien ravintosisällön mukaan.

Ohjelmassa käytettyjä teknologioita ovat Node.js, Express, React sekä Redux ja käyttöjärjestelmä Win11. Ruokaoliot on tallennettu MongoDB-tietokantaan. Ravintoarvojen lisäksi ruokien voitot tallennetaan, jotta voidaan ylläpitää scoreboardia. Taistelulogiikka on toteutettu kokonaan frontendissa. 

## Pelin pelaaminen

Sivun yläosan palkista voi navigoida pelin eri osioihin. Scoreboard-osio näyttää nimensä mukaisesti tallennetut ruoat paremmuusjärjestyksessä. Ruoan nimeä klikkaamalla pääsee tarkastelemaan ruoan ravintosisältöä ja valitsemaan ruoan taisteluun. Mikäli yhtään ruokaa ei ole tallennettu, sivu on tyhjä. Ruokia voi etsiä ja tallentaa Select foods for batte -osiossa. Kun kaksi ruokaa on valittu taisteluun, taistelun voi aloittaa Battle-osiossa.

## Ohjelman käynnistäminen

Ennen käynnistämistä projektin backend-kansioon tulee luoda .env -tiedosto, johon määritellään ympäristömuuttujat. 

#### PORT=3003 (oletus)

#### MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority 

MongoDB:een täytyy siis luoda käyttäjä ja klusteri.

Ennen ohjelman käynnistämistä asenna vielä riippuvuudet suorittamalla komento

### `npm install`

sekä backend- että frontend-kansiossa.

Tämän jälkeen suorita komento

### `npm run dev`

backend-kansiossa ja 

### `npm start`

frontend-kansiossa.

Nyt ohjelma lienee käynnissä osoitteessa http://localhost:3000 .
