const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const zurkaSchema = new Schema(
  {
    organizator: {
      type: String,
      required: true,
      trim: true,
    },
    naziv: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    opis: {
      type: String,
      required: true,
      trim: true,
    },
    datumOdrzavanja: {
      type: Date,
      required: true,
    },
    tipZurke: {
      type: String,
      required: true,
      trim: true,
    },
    brojljudi: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Zurka = mongoose.model("Zurka", zurkaSchema);

module.exports = Zurka;