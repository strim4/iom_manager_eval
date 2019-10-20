//Database operation model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OperationSchema = new Schema({
operation: String,
});

const Operation = mongoose.model('Operation', OperationSchema)
module.exports = Operation;