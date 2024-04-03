const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    username: { type: String },
    password: { type: String},
    email: { type: String },
    apikey: { type: String },
    defaultKey: { type: String },
    premium: { type: Array },
    limit: { type: Number }
});
module.exports.User = mongoose.model('User', Users);