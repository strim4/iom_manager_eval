//Database case model
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const CaseSchema = new Schema({
casenr: Number,
pid: Number,
fid: Number,
name: String,
surname: String,
birthdate: String,
diagnose: String,
operation: String,
isismodality: String,
opdate: String,
description: String,
surgeon: String,
assistant: String,
});



const Case = mongoose.model('Case', CaseSchema)
module.exports = Case;