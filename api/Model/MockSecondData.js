const mongoose = require('mongoose');

// Get the Schema constructor
var Schema = mongoose.Schema;

const mockSecondSchema = new mongoose.Schema({
    full_name: { type: String, require: true },
    email: { type: String, require: true },
    team_name :  { type: String, require: true }
});


module.exports = mongoose.model('MockSecondData', mockSecondSchema);
