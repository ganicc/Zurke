const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:|\./g, "") + " - " + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const Zurka = require("../models/Zurka");

router.post("/organizujzurku", upload.single("slikaZurke"), (req, res) => {
  const zurka = new Zurka({
    organizator: req.body.organizator,
    adresa: req.body.adresa,
    vreme: req.body.vreme,
    datum: req.body.datum,
    muzika: req.body.muzika,
    brojljudi: req.body.brojljudi,
    slikaZurke: req.file.path,
  });
  if (zurka.brojljudi <= 0) {
    req.flash("error_msg", "Ne mozete kreirati zurku bez ljudi.");
    res.redirect("/dashboard");
    return;
  }
  zurka
    .save()
    .then((zurka) => {
      res.redirect("/dashboard");
    })
    .catch((err) => console.log(err));
});

router.post("/delete", (req, res) => {
  Zurka.findByIdAndDelete({ _id: req.body.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log("Uspeo.");
      res.redirect(req.get("referer"));
    }
  });
});

router.get("/svezurke", (req, res) => {
  Zurka.find()
    .then((zurke) => res.json(zurke))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/zurka", (req, res) => {
  console.log("Ime ulogovanog korisnika", req.body.name);
  Zurka.findById({ _id: req.body._id })
    .then((zurka) => {
      console.log(zurka);
      if (zurka == null) {
        res.redirect("/dashboard");
      } else {
        res.render("zurka", {
          zurka: zurka,
          name: req.body.name,
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
