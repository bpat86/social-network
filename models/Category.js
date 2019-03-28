const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
	name: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'posts'
		}
	]
});

module.exports = Category = mongoose.model('Category', CategorySchema);
