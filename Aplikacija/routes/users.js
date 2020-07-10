const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const Zurka = require("../models/Zurka");

//Login page
router.get("/login", (req, res) => {
  res.render("login");
});

//Register page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Popunite sve podatke." });
  }

  if (password !== password2) {
    errors.push({ msg: "Sifre se ne poklapaju" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Sifra mora biti duza od 6 karaktera" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Vec postoji korisnik sa tim emailom." });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        //pretvaranje sifre u bcrypt

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Uspesno ste se registrovali.");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Uspesno ste se odjavili.");
  res.redirect("/users/login");
});
router.post("/pozovi", (req, res, next) => {
  var id;
  console.log("Proso sam ovde");
  console.log(req.body);
  console.log("Provera selektovanog korisnika: " + req.body.id);
  console.log("Provera ulogovanog korisnika: " + req.body.korisnik);
  console.log("Provera selektovanog korisnika: " + req.body.name);
  if (req.body.name == req.body.korisnik) {
    req.flash("error_msg", "Ne mozete sami sebe pozvati na događaj");
    res.redirect("/dashboard");
    return;
  }
  User.findOne({ name: req.body.name }).then((user) => {
    id = user._id;
    User.findByIdAndUpdate({ _id: id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("---> Uspesno! <---");
        res.redirect("/dashboard");
      }
    });
  });
});

router.post("/update", (req, res, next) => {
  var id;
  console.log("Provera korisnika: " + req.body.organizator);
  if (req.body.name == req.body.organizator) {
    req.flash("error_msg", "Ne mozete reagovati na svoj dogadjaj");
    res.redirect("/dashboard");
    return;
  }
  User.findOne({ name: req.body.organizator }).then((user) => {
    id = user._id;
    User.findByIdAndUpdate(
      { _id: id },
      { routerData: { Dogadjaj: true, userReq: req.body.name } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log("---> Uspesno! <---");
          res.redirect("/dashboard");
        }
      }
    );
  });
});

router.post("/changepassword", (req, res, next) => {
  const { passwordchange, passwordchange2, passwordchange3 } = req.body;
  var id;
  let errors = [];
  User.findOne({ name: req.body.name }).then((user) => {
    bcrypt.compare(passwordchange, user.password, (err, isMatch) => {
      if (err) {
        req.flash("error_msg", "Doslo je do greske prilikom promene lozinke.");
        res.redirect("/users/profile");
        return;
      }
      if (isMatch) {
        if (passwordchange2 !== passwordchange3) {
          req.flash("error_msg", "Unete sifre se ne poklapaju.");
          res.redirect("/users/profile");
          return;
        }
        if (passwordchange2.length < 6) {
          req.flash("error_msg", "Nova sifra mora biti duza od 6 karaktera.");
          res.redirect("/users/profile");
          return;
        }
        id = user._id;
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(passwordchange2, salt, (err, hash) =>
            User.findByIdAndUpdate({ _id: id }, { password: hash }, function (
              err,
              result
            ) {
              if (err) {
                req.flash(
                  "error_msg",
                  "Doslo je do greske prilikom menjanja lozinke."
                );
                res.redirect("/users/profile");
                return;
              } else {
                req.flash("success_msg", "Uspesno ste promenili lozinku.");
                res.redirect("/users/profile");
                return;
              }
            })
          )
        );
      } else {
        req.flash("error_msg", "Trenutna sifra nije ispravna.");
        res.redirect("/users/profile");
        return;
      }
    });
  });
});

router.post("/changeusername", (req, res, next) => {
  const { namechange } = req.body;
  console.log(namechange);
  var id;
  let errors = [];
  User.findOne({ name: namechange }).then((user) => {
    console.log(user);
    if (!user) {
      User.findOne({ name: req.body.name }).then((user) => {
        id = user._id;
        User.findByIdAndUpdate({ _id: id }, { name: namechange }, function (
          err,
          result
        ) {
          if (err) {
            console.log("Greska");
            res.redirect("/users/profile");
            return;
          } else {
            console.log("Uspesno");
            res.redirect("/users/profile");
            return;
          }
        });
      });
    } else {
      res.redirect("/users/profile");
      return;
    }
  });
});

router.post("/delete", (req, res) => {
  console.log(req.body);
  User.findByIdAndDelete({ _id: req.body.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.redirect(req.get("referer"));
    }
  });
});

router.post("/updateReverse", (req, res, next) => {
  var id;

  console.log("UpdateReverse " + req.user.routerData.userReq);

  User.findOne({ name: req.user.routerData.userReq }).then((user) => {
    User.findByIdAndUpdate(
      { _id: user._id },
      { routerData: { Odgovor: true } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          Zurka.findOne({ organizator: req.body.name }).then((zurka) => {
            id = zurka._id;
            console.log(zurka);
            var novibroj = zurka.brojljudi - 1;
            Zurka.findByIdAndUpdate(
              { _id: id },
              { brojljudi: novibroj },
              function (err, result) {
                if (err) {
                  res.send(err);
                } else {
                  console.log("UPDATE JE ODGOVOR");
                }
              }
            );
          });
        }
      }
    );
  });

  User.findOne({ name: req.body.name }).then((user) => {
    id = user._id;
    User.findByIdAndUpdate(
      { _id: id },
      { routerData: { Dogadjaj: false } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/dashboard");
        }
      }
    );
  });
});

router.post("/updateOdgovor", (req, res, next) => {
  var id;
  User.findOne({ name: req.body.name }).then((user) => {
    id = user._id;
    User.findByIdAndUpdate(
      { _id: id },
      { routerData: { Odgovor: false } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/dashboard");
        }
      }
    );
  });
});

module.exports = router;
