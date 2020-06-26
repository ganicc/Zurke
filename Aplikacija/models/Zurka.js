const mongoose = require('mongoose');

const ZurkaSchema = new mongoose.Schema({
    organizator:
    {
        type: String,
        required: true
    },
    adresa:
    {
        type: String,
        required: true
    },
    vreme:
    {
        type: String,
        required: true
    },
    datum:
    {
        type: String,
        required: true
    },
    muzika:
    {
        type: String,
        required: true
    },
    brojljudi:
    {
        type: Number,
        required: true
    }
});

const Zurka = mongoose.model('Zurka', ZurkaSchema);

module.exports = Zurka;