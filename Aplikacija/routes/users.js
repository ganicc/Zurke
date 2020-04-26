const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const korisnickoIme = req.body.korisnickoIme;
  const sifra = req.body.sifra;
  const datumRodj = req.body.datumRodj;
  const email = req.body.email;
  const pol = req.body.pol;

  const newUser = new User({
    ime,
    prezime,
    korisnickoIme,
    sifra,
    datumRodj,
    email,
    pol,
  });

  newUser
    .save()
    .then(() => res.json("User added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
