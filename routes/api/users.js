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

// Load models
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route 	POST api/users/register
// @desc 	Register user
// @access 	Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (! isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				errors.email = 'Email already exists';
				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: '200', // Size
					r: 'pg', // Rating
					default: 'mm' // Default
				});
				const newUser = new User({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					name: req.body.firstName + ' ' + req.body.lastName,
					email: req.body.email,
					phoneNumber: req.body.phoneNumber,
					avatar,
					password: req.body.password
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					});
				});
			}
		})
		.catch(err => console.log(err))
});

// @route 	POST api/users/login
// @desc 	Login User / return JWT Token
// @access 	Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	// Check Validation
	if (! isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email })
		.populate('posts')
		.populate('profiles')
		.then(user => {
			if (! user) {
				errors.email = 'User not found';
				return res.status(400).json(errors);
			}

			// Check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					// User Matched
					// Create JWT Payload
					const payload = {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						name: user.firstName + ' ' + user.lastName,
						avatar: user.avatar,
						posts: user.posts,
						profile: user.profile
					};

					jwt.sign(
						payload,
						keys.secretOrKey,
						{ expiresIn: 3600 }, (err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
							payload
						});
					});

				} else {
					errors.password = 'Password is incorrect';
					return res.status(400).json(errors);
				}
			});
	});
});

// @route 	GET api/users/current
// @desc 	Return current user
// @access 	Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		firstName: req.user.firstName,
		lastName: req.user.lastName,
		name: req.user.firstName + ' ' + req.user.lastName,
		email: req.user.email
	});
});

module.exports = router;
