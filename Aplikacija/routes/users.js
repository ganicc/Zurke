const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User  = require('../models/User');
const passport = require('passport');
const Zurka = require('../models/Zurka');

//Login page
router.get('/login', (req,res)=>{ res.render('login')});

//Register page
router.get('/register', (req,res)=>{ res.render('register')});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2)
    {
        errors.push({ msg: 'Popunite sve podatke.'});
    }

    if(password !== password2)
    {
        errors.push({ msg: 'Sifre se ne poklapaju'});
    }

    if(password.length < 6)
    {
        errors.push({ msg: 'Sifra mora biti duza od 6 karaktera'});
    }

    if(errors.length > 0)
    {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else
    {
        User.findOne({ email: email })
            .then(user => {
                if(user)
                {
                    errors.push({msg: 'Vec postoji korisnik sa tim emailom.'})
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else
                {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    //pretvaranje sifre u bcrypt

                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err)
                        {
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(user=>{
                                req.flash('success_msg', 'Uspesno ste se registrovali.');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
    }

});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next)
})

router.get('/logout', (req,res) => {
    req.logout()
    req.flash('success_msg', 'Uspesno ste se odjavili.')
    res.redirect('/users/login')
})

router.post('/update',(req,res,next)=>{
    var id;
    User.findOne({name:req.body.name}).then(user=>{
        id=user._id;
        console.log
        User.findByIdAndUpdate({_id:id},{dogadjaj:true},function(err, result) {
            if (err) {
                res.send(err);
              } else {
                    Zurka.findOne({organizator:user.name}).then(zurka=>{
                        id=zurka._id;
                        var novibroj = zurka.brojljudi-1;
                        Zurka.findByIdAndUpdate({_id:id},{brojljudi:novibroj},function(err, result){
                            if(err)
                            {
                                res.send(err);
                            }
                            else
                            {
                                res.redirect('/dashboard')
                            }
                        })
                    })
              }        
        })
    }) 
    
})

module.exports = router;