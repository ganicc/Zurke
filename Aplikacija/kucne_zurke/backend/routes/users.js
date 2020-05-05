const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isLogged, isAdmin } = require("../auth.js");
const { TIP } = require("../models/tip");

const User = require("../models/user.model");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    ime: req.body.ime,
    prezime: req.body.prezime,
    korisnickoIme: req.body.korisnickoIme,
    sifra: req.body.sifra,
    datumRodj: req.body.datumRodj,
    email: req.body.email,
    pol: req.body.pol,
    tip: req.body.tip,
    created: today,
  };

  User.findOne({ korisnickoIme: req.body.korisnickoIme })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.sifra, 10, (err, hash) => {
          userData.sifra = hash;
          User.create(userData)
            .then((user) => {
              res.json({ status: user.korisnickoIme + " je registovan!" });
            })
            .catch((err) => res.send("Error" + err));
        });
      } else {
        res.json({ error: "Vec postoji ovaj korisnik!" });
      }
    })
    .catch((err) => res.send("Error " + err));
});

users.post("/login", (req, res) => {
  User.findOne({ korisnickoIme: req.body.korisnickoIme })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.sifra, user.sifra)) {
          //Sifre se poklapaju
          const payload = {
            _id: user._id,
            ime: user.ime,
            prezime: user.prezime,
            korisnickoIme: user.korisnickoIme,
            datumRodj: user.datumRodj,
            email: user.email,
            pol: user.pol,
          };

          let token = jwt.sign(payload, process.env.SECRET_KEY, {});
          res.send(token);
        } else {
          //Sifre se ne poklapaju
          res.json({ error: "Pogresna sifra!" });
        }
      } else {
        res.json({ error: "Ne postoji ovaj korisnik!" });
      }
    })
    .catch((err) => res.send("Error" + err));
});

/*users.get("/profil", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id,
  })
    .then((user) => {
      if (user) res.json(user);
      else res.send("Ne postoji ovaj korisnik!");
    })
    .catch((err) => res.send("Error" + err));
});*/

users.get("/admin", isLogged, isAdmin(TIP.ADMIN), (req, res) => {
  res.send("Admin page");
});

users.get("/profil", (req, res) => {
  User.findOne({ korisnickoIme: req.body.korisnickoIme })
    .then((user) => {
      if (user) res.send(user);
      else res.send("Ne postoji taj korisnik");
    })
    .catch((err) => res.send("error" + err));
});

module.exports = users;
