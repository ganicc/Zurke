const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req,res)=>{ res.render('welcome')});

router.get('/dashboard', ensureAuthenticated, (req, res)=> { 
    res.render('dashboard',{
        name: req.user.name,
        dogadjaj: req.user.dogadjaj
   })})

router.get('/users/profile', ensureAuthenticated, (req, res)=> { 
    res.render('profile',{
        name: req.user.name,
        email: req.user.email,
        date: req.user.date
    })})

router.get('/organizujzurku', ensureAuthenticated, (req, res)=> { 
    res.render('organizujzurku',{
        name: req.user.name
    })})
    
    
module.exports = router;