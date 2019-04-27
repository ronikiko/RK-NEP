const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const mongodb = require('./keys/config').mongoDB;


const port = process.env.PORT || 3000;

// connecting to mongoDb server
mongoose.connect(mongodb, {useNewUrlParser : true })
    .then(response => {
        console.log('Connected to DB');
        app.listen(port, () => console.log('Server runing on port ' + port));
    })
    .catch(err => console.log(err));

// body-parser middlewere
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );


app.use(passport.initialize() );
//passport config
require('./passport/passport')(passport);



app.use('/api/users', users);





