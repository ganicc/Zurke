const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    date:
    {
        type: Date,
        default: Date.now
    },
    routerData:{
        'Dogadjaj':{
            type: Boolean,
            default: false
        },
        'userReq':{
            tpye:String
        },
        'Odgovor':{
            type: Boolean,
            default: false
        },
        'Poziv':{
            type: Boolean,
            default: false
        },
        'Potvrda1':{
            type: String    
        },
        'Potvrda2':{
            type: String
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;