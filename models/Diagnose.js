//Database case model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DiagnoseSchema = new Schema({
diagnose: String,
});

const Diagnose = mongoose.model('Diagnose', DiagnoseSchema)
module.exports = Diagnose;