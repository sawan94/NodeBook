var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// create a schema
var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: {type: Boolean, default: false },
    location: String,
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

// Execute before each user.save() call
userSchema.pre('save', function(callback) {
    var user = this;
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Users', userSchema);