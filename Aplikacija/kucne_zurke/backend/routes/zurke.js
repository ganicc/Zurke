const router = require("express").Router();
let Zurka = require("../models/zurka.model");

router.route("/").get((req, res) => {
  Zurka.find()
    .then((zurke) => res.json(zurke))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:naziv").get((req, res) => {
  Zurka.find(naziv=req.body.naziv)
    .then((zurke) => res.json(zurke))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/register").post((req, res) => {
  const zurka =new Zurka ({
    organizator: req.body.organizator,
    naziv: req.body.naziv,
    opis: req.body.opis,
    tipZurke: req.body.tipZurke,
    brojljudi: req.body.brojljudi,
    datumOdrzavanja: req.body.datumOdrzavanja
  });
  zurka.save()
    .then((zurka) => res.json(zurka.naziv+" added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
