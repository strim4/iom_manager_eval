//Database completcase model
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const CompletCaseSchema = new Schema({
//id: String,
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
entries : Object,
evaluation: Object,
baselines: Object,
extras: Object,
interpretation: String,
edf: String,

},
{ typeKey: '$type' }
);



const CompletCase = mongoose.model('CompletCase', CompletCaseSchema)
module.exports = CompletCase;