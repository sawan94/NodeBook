var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RequestSchema = new Schema({
    bookID: {type: String, required: 'Kindly enter the Book ID of the request'},
    readerID: {type: String, required: 'Kindly enter the readerID of the request'},
    message: {type: String, required: 'Kindly enter some message for the onwer to approve your request'},
    Added_date: {type: Date, default: Date.now},
    approved: {type: Boolean, default: false}
});

module.exports = mongoose.model('Requests', RequestSchema);