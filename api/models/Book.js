var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var BookSchema = new Schema({
    name: {type: String, required: 'Kindly enter the name of the book'},
    ISBN: {type: String, required: 'Kindly enter the ISBN of the book'},
    summary: {type: String, required: 'Kindly enter some summary of the book'},
    Added_date: {type: Date, default: Date.now},
    orig_owner: {type: String,required: 'Kindly enter the owner of the book'},
    current_owner: {type: String},
    current_location: {type: String,required: 'Kindly enter the current location of the book'},
    available: {type: Boolean, default: true}
});

module.exports = mongoose.model('Books', BookSchema);