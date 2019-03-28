const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load Friends Model
const Friends = require('../../models/Friends');

// @route 	POST api/friendships
// @desc 	Make a friend request
// @access 	Private
router.post('/friendships/create/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};

	Friends.findOneAndUpdate({ user: req.user.id })
		.then(friend => {
			if (friend) {
				errors.handle = 'You already send a friend request to that person';
				res.status(400).json(errors);
			}
			res.json(friend);
		})
		.catch(err => res.status(404).json(err));
});
