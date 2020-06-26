const express = require('express');
const expresLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Zurka = require('./models/Zurka');

const app = express()
app.use(express.static(__dirname + '/views'));

require('./config/passport')(passport);

// Mongo
const db = require('./config/keys').MongoURI;

// Connect
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(err => console.log(err));

//EJS
app.use(expresLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
});

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/zurke', require('./routes/zurke'))

//RUTE
app.get('/pregledzurki', function(req,res){
    Zurka.find().then(zurka=>{
        res.render('pregledzurki',{
            zurka:zurka
        })
    })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('ide gas ali malo manji'))