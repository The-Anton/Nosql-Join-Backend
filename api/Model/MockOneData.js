const mongoose = require('mongoose');

// Get the Schema constructor
var Schema = mongoose.Schema;

const mockOneSchema = new mongoose.Schema({
    full_name: { type: String, require: true },
    email:  { type: String, require: true },
    number: { type: Number, require: true },
    city: { type: String, require: true },
    url:  { type: String, require: true }
});

mockOneSchema.index({ full_name: 1 }, { unique: true })

module.exports = mongoose.model('MockOneData', mockOneSchema);
