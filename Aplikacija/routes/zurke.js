const express=require('express')
const router=express.Router()

const Zurka = require('../models/Zurka')

router.post('/organizujzurku', (req,res)=>{
    const zurka = new Zurka({
        organizator: req.body.organizator,
        adresa: req.body.adresa,
        vreme: req.body.vreme,
        datum: req.body.datum,
        muzika: req.body.muzika,
        brojljudi: req.body.brojljudi
    })
    zurka.save()
            .then(zurka => {
                res.redirect('/dashboard')
            })
            .catch(err => console.log(err))
})

module.exports=router