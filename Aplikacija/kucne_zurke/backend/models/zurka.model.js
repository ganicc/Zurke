const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const zurkaSchema = new Schema(
  {
    organizator: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Zurka = mongoose.model("Zurka", zurkaSchema);

module.exports = Zurka;
