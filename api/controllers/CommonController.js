'use strict';

//Author : Sawan Mehta

var mongoose = require('mongoose'),
    Book = mongoose.model('Books'),
    User = mongoose.model('Users'),
    Request = mongoose.model('Requests');


//Book Starts
exports.list_all_books = function(req, res) {
    var filter={};
    {
        if(req.query.location)
            filter.current_location = req.query.location;
        if(req.query.name)
            filter.name = req.query.name;
    }
    var skip  = req.query.page?req.query.page:0;
    var limit = req.query.limit?parseInt(req.query.limit,10):10; 
    var template = req.query.template?req.query.template:""; 
    Book.find(filter, template, { skip: (skip * limit), limit: limit}, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};

exports.add_a_book = function(req, res) {
    var book = new Book(req.body);
    book.orig_owner = req.user._id;
    book.save(function(err, bookres) {
        if (err)
            res.send(err);
        res.json({status: "success", book: bookres});
    });  
};

exports.get_a_book = function(req, res) {
    var template = req.query.template?req.query.template:""; 
    Book.findById(req.params.bookId, template, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.update_a_book = function(req, res) { 
    Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.delete_a_book = function(req, res) {
    Book.remove({
        _id: req.params.bookId
    }, function(err, book) {
        if (err)
            res.send(err);
        res.json({ message: 'Book successfully deleted' });
    });
};
//Book Ends

//Request Starts

exports.list_all_requests = function(req, res) {
    var filter={};
    {
        if(req.query.bookid)
            filter.bookID = req.query.bookid;
        if(req.query.approved)
            filter.approved = req.query.approved;
    }
    var skip  = req.query.page?req.query.page:0;
    var limit = req.query.limit?parseInt(req.query.limit,10):10; 
    var template = req.query.template?req.query.template:""; 
    Request.find(filter, template, { skip: (skip * limit), limit: limit}, function(err, request) {
        if (err)
            res.send(err);
        res.json(request);
    });
};

exports.add_a_request = function(req, res) {
    var request = new Request(req.body); 
    request.save(function(err, requestres) {
        if (err)
            res.send(err);
        res.json({status:"success",request:requestres}); 
    });  
};


exports.get_a_request = function(req, res) {
    var template = req.query.template?req.query.template:""; 
    Request.findById(req.params.requestId, template, function(err, request) {
        if (err)
            res.send(err);
        res.json(request);
    });
};


exports.update_a_request = function(req, res) {
    Request.findOneAndUpdate({_id: req.params.requestId}, req.body, {new: true }, function(err, request) {
        if (err)
            res.send(err);
        res.json(request);
    });
};


exports.delete_a_request = function(req, res) {
    Request.remove({
        _id: req.params.requestId
    }, function(err, request) {
        if (err)
            res.send(err);
        res.json({ message: 'Request successfully deleted' });
    });
};

//Request Ends

//User Starts
exports.list_all_users = function(req, res) {
    if(!req.user.admin){
        res.status(401).send({status: 'failed', message: "You are not authorised."})
    }
    var skip  = req.query.page?req.query.page:0;
    var limit = req.query.limit?parseInt(req.query.limit,10):10;
    var template = req.query.template?req.query.template:""; 
    User.find({}, template, { skip: (skip * limit), limit: limit}, function(err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};

exports.add_a_user = function(req, res) {
    var user = new User(req.body);
    user.save(function(err, userres) {
        if (err)
            res.send(err);
        res.json({status:"success",user:userres});
    });  
};

//User Ends