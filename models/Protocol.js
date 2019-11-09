//Database protocol model
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ProtocolSchema = new Schema({
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
entries : [{
    ts: String,
    entrycat: Object,
    event: Object,
    comment: String,
     }],
},
{ typeKey: '$type' }
);



const Protocol = mongoose.model('Protocol', ProtocolSchema)
module.exports = Protocol;