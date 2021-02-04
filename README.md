# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Ohjelman suoritus

Voit suorittaa ohjelman käyttämällä node.js suoritusympäristöä (Mikäli sinulla ei ole Node.js voit ladata sen täältä: https://nodejs.org/en/ ) \
Mikäli sinulla on node.js, voit käynnistää web-käyttöliittymän menemällä komentorivillä (esim powerShell) sovelluksen hakemistoon.

Sovellus käynnistetään kirjoittamalla komentoriviin: npm start \
Sovellus käynnistyy oletusarvoisesti localhostin porttiin 3000, eli osoitteeseen http://localhost:3000

Sovelluksen koodi on hakemistossa src \
Sovelluksen komponentit ovat hakemistossa src/components

## Sovelluksen käyttäminen

### Rahojen kohdentaminen
Sovelluksessa on Ylhäällä ensin kaikkien lahjoitusten yhteissumma. \
Tämän alapuolella on kohdentamattomien lahjoitusten määrä.

"Kohdenna lahjoituksia" - otsikon alapuolella on kaksi kenttää, joista ensimmäiseen laitetaan projektin nimi ja toiseen rahamäärä. \
Mikäli käyttäjä laittaa rahaa väärälle projektille, voi hän peruuttaa kohdennuksen ottamalla projektilta rahaa käyttämällä samoja kenttiä. \
Mikäli käyttäjä ottaa rahaa projektilta hän kirjoittaa ensimmäiseen kenttään projektin nimen ja toiseen otettavan määrän mutta negatiivisena.

### Esimerkki tapaus rahojen kohdentamisesta

Käyttäjä haluaa siirtää "Amurintiikerien palautus luontoon" - projektille rahaa 200€. \
Tällöin käyttäjä kirjoittaa ensimmäiseen kenttään projektin nimen (kentän alapuolelle ilmestyy ehdotus lista, josta käyttäjä voi myös valita projektin) \
Käyttäjä kirjoittaa toiseen kenttään määrän 200 (ohjelma toimii myös mikäli käyttäjä kirjoittaa esim. 200€) ja painaa "kohdenna" nappia, jolloin projektille siirtyy rahaa, kohdentamattomien rahojen määrä vähenee ja kenttien ylä puolelle ilmestyy "onnistui" teksti. \
Mikäli käyttäjä tekee virheen, kenttien yläpuolelle ilmestyy mahdollisimman kuvaileva virhe-ilmoitus.

### Esimerkki tapaus rahojen uudelleen kohdentamisesta

Käyttäjä on siirtänyt rahaa väärälle projektille. \
Mikäli projektia ei ole aloitettu, voi käyttäjä perua virheensä siirtämällä projektilta negatiivisen summan rahaa. \
Tällöin käyttäjä kirjoittaa enismmäiseen kenttään projektin nimen ja toiseen kenttään summan esim. -200, tai -200€ \
Tämän jälkeen kohdentamattomien lahjoitusten määrä kasvaa ja projektin rahamäärä pienenee. \
Mikäli käyttäjä kirjoittaa suuremman summan, kuin projektilla on kohdentamattomia varoja, ilmestyy virhe ilmoitus, joka kertoo paljonko kohdentamattomia varoja projektilla on.

### Projektin toteuttaminen

Mikäli projektilla on tarpeeksi rahaa, voi käyttäjä toteuttaa projektin kirjoittamalla sen nimen "Toteuta projekti" - otsikon alla olevaan kenttään ja painamalla "toteuta" - nappia \
Tällöin projekti siirtyy "toteutetut" projektit listaan ja sen varhoihin ei voi enää vaikuttaa.
Mikäli projektilla ei ole tarpeeksi rahaa ja käyttäjä yrittää toteuttaa sen sovellus ilmoittaa tästä virheviestillä.



## Parannus ehdotukset

### Mikäli projekti on jo saavuttanut tavoitteen:
Tällöin olisi hyvä varmistaa käyttäjältä haluttaanko sille vielä kohdistaa varoja
### Suurten varojen kohdistaminen:
Mikäli käyttäjä on kohdistamassa merkittävän summan rahaa, olisi hyvä varmistaa, että käyttäjä haluaa kohdistaa sen verran rahaa.
### Projektien aloitus
Projektin aloituksessa olisi hyvä olla varmistus, että käyttäjä aloittaa oikeaa projektia.\
Mikäli projektilla on paljon enemmän rahaa(esim. yli 5000€), kuin tavoite, olisi hyvä varmistaa, että sillä ei ole kohdentamattomia lahjoituksia.
