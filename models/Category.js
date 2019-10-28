//Database Category model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
name: String,
options: [],
});

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category;