//Database surgeon model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SurgeonSchema = new Schema({
surgeon: String,
});

const Surgeon = mongoose.model('Surgeon', SurgeonSchema)
module.exports = Surgeon;