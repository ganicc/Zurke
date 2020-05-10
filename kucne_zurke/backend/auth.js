const User = require("./models/user.model");

function isLogged(req, res, next) {
  if (req.body.korisnickoIme == null) {
    res.status(403);
    return res.send("Morate se ulogovati.");
  }
  next();
}

function isAdmin(tip) {
  return (req, res, next) => {
    User.findOne({ korisnickoIme: req.body.korisnickoIme })
      .then((user) => {
        if (!user) res.send("Ne postoji ovaj korisnik");
        if (user.tip !== tip)
          res.send("Nemate privilegije za koriscenje ove stranice!");
        next();
      })
      .catch((err) => res.send("error" + err));
  };
}

module.exports = { isLogged, isAdmin };
