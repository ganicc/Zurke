const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    ime: {
      type: String,
      required: true,
      trim: true,
    },
    prezime: {
      type: String,
      required: true,
      trim: true,
    },
    korisnickoIme: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sifra: {
      type: String,
      required: true,
      trim: true,
    },
    datumRodj: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pol: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
