const router = require("express").Router();
const express = require("express");
const cors = require("cors");
//const jwt = require("jsonwebtoken");

const Zurka = require("../models/zurka.model");
const zurke = express.Router();
zurke.use(cors());

/*router.route("/").get((req, res) => {
  Zurka.find()
    .then((zurke) => res.json(zurke))
    .catch((err) => res.status(400).json("Error: " + err));
})*/

zurke.post("/register", (req, res) => {
  const today = new Date();
  //console.log("registracijaZurke");
  const ZurkaPodaci = {
    organizator: req.body.organizator,
    naziv: req.body.naziv,
    opis: req.body.opis,
    tipZurke: req.body.tipZurke,
    brojljudi: req.body.brojljudi,
    datumOdrzavanja: req.body.datumOdrzavanja,
    created: today,
  };
  //console.log("Zurka je napravljena");
  Zurka.create(ZurkaPodaci)
    .then((zurka) => res.json("Zurka added."))
    .catch((err) => res.status(400).json("Error: " + err));
  //.catch((err) => res.send("Error" + err));
  console.log("Zurka je dodata");
});

/*router.route("/add").post((req, res) => {
  const organizator = req.body.organizator;
  const newZurka = new Zurka({ organizator });

  newZurka
    .save()
    .then(() => res.json("Zurka added."))
    .catch((err) => res.status(400).json("Error: " + err));
});*/

module.exports = zurke;
