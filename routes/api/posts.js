const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Load Validation
const validatePostInput = require('../../validation/post');

// @route 	GET api/posts
// @desc 	Get posts
// @access 	Public
router.get('/', (req, res) => {
	const errors = {};
	errors.nopostsfound = 'There are no posts';

	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json(errors));
});

// @route 	GET api/posts/:id
// @desc 	Get posts by id
// @access 	Public
router.get('/:id', (req, res) => {
	const errors = {};
	errors.nopostfound = 'No post found with that ID';

	Post.findById(req.params.id)
		.sort({ date: -1 })
		.then(post => res.json(post))
		.catch(err => res.status(404).json(errors));
});

// @route 	POST api/posts
// @desc 	Create a post
// @access 	Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (! isValid) {
		// Return errors with 400 status
		return res.status(400).json(errors)
	}

	const newPost = new Post({
		id: req.user.id,
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	//newPost.save().then(post => res.json(post));
	newPost.save().then(post => {
	    User.update({ _id: req.user.id }, { $push: { posts: post._id }}, (err) => {
	        res.json(post);
	    });
	});
});

// @route 	DELETE api/posts/:id
// @desc 	Delete post
// @access 	Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id).then(post => {
			// Check for post owner
			if (post.user.toString() !== req.user.id) {
				return res.status(401).json({ notauthorized: 'User not authorized' })
			}

			// Delete
			post.remove().then(() => res.json({ success: true }));
		})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

// @route 	POST api/posts/like/:id
// @desc 	Like post
// @access 	Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id).then(post => {
			if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
				return res.status(400).json({ alreadyliked: 'You have already liked this post' });
			}

			// Add user to likes array
			post.likes.unshift({ user: req.user.id });
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

// @route 	POST api/posts/unlike/:id
// @desc 	Unlike post
// @access 	Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id).then(post => {
			if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
				return res.status(400).json({ notliked: 'You have not yet liked this post' });
			}

			// Remove user from likes array
			const removeIndex = post.likes
				.map(item => item.user.toString())
				.indexOf(req.user.id);

			// Splice from array
			post.likes.splice(removeIndex, 1);

			// Save
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

// @route 	POST api/posts/comment/:id
// @desc 	Add comment to post
// @access 	Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (! isValid) {
		// Return errors with 400 status
		return res.status(400).json(errors)
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			}

			// Add to comments array
			post.comments.unshift(newComment);

			// Save to DB
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route 	DELETE api/posts/comment/:id/:comment_id
// @desc 	Remove comment to post
// @access 	Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			// Check to see if comment exists
			if (post.comments.filter(comment => comment.id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentdoesnotexist: 'Comment does not exist' });
			}

			// Get remove index
			const removeIndex = post.comments
				.map(item => item._id.toString())
				.indexOf(req.params.comment_id);

			// Splice
			post.comments.splice(removeIndex, 1);
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});

module.exports = router;
