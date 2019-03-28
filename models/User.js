const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'profiles'
	},
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'posts'
	}],
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: Number
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);
