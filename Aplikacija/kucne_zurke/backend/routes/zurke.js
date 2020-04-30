const router = require("express").Router();
let Zurka = require("../models/zurka.model");

router.route("/").get((req, res) => {
  Zurka.find()
    .then((zurke) => res.json(zurke))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const organizator = req.body.organizator;

  const newZurka = new Zurka({ organizator });

  newZurka
    .save()
    .then(() => res.json("Zurka added."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
