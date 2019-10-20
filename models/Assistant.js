//Database assistant model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AssistantSchema = new Schema({
assistant: String,
});

const Assistant = mongoose.model('Assistant', AssistantSchema)
module.exports = Assistant;