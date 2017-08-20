var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Book = require('./api/models/Book'),
    User = require('./api/models/User'), 
    Request = require('./api/models/Request'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    authController = require('./api/controllers/Auth');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/NodeBook'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());


var routes = require('./api/routes/CommonRoutes'); //importing route
routes(app); //register the route

//Handle 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('RESTful NodeBook API server started on: ' + port);