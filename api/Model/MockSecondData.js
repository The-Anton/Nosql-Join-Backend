const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const mockSecondSchema = new mongoose.Schema({
    full_name: { type: String, require: true },
    email: { type: String, require: true },
    team_name :  { type: String, require: true }
});

mockSecondSchema.index({ full_name: 1 }, { unique: true })

module.exports = mongoose.model('MockSecondData', mockSecondSchema);
