//Database diagnose model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AnalyseSchema = new Schema({
name: String,
cases: Object,
});

const Analyse = mongoose.model('Analyse', AnalyseSchema)
module.exports = Analyse;