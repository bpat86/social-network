const Validator = require('Validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
	data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	// data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.passwordConfirmed = !isEmpty(data.passwordConfirmed) ? data.passwordConfirmed : '';

	// First Name, Last Name, Username, Full Name
	if (! Validator.isLength(data.firstName, { min: 2, max: 30 })) {
		errors.firstName = 'Name must be between 2 and 30 characters';
	}
	if (! Validator.isLength(data.lastName, { min: 2, max: 30 })) {
		errors.lastName = 'Name must be between 2 and 30 characters';
	}

	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'First name field is required';
	}
	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'Last name field is required';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}
	if (! Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// if (Validator.isMobilePhone(data.phoneNumber, ['any'])) {
	// 	errors.phoneNumber = 'Enter a valid Phone number';
	// }
	// if (Validator.isEmpty(data.phoneNumber)) {
	// 	errors.phoneNumber = 'Phone number field is required';
	// }

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (! Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	if (Validator.isEmpty(data.passwordConfirmed)) {
		errors.passwordConfirmed = 'Confirm Password field is required';
	}
	if (! Validator.equals(data.password, data.passwordConfirmed)) {
		errors.passwordConfirmed = 'Passwords must match';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
