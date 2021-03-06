const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Schema
const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			likes: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					}
				}
			],
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			},
			comments: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					},
					text: {
						type: String,
						required: true
					},
					likes: [
						{
							user: {
								type: Schema.Types.ObjectId,
								ref: 'users'
							}
						}
					],
					name: {
						type: String
					},
					avatar: {
						type: String
					},
					date: {
						type: Date,
						default: Date.now
					}
				}
			],
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('posts', PostSchema);
