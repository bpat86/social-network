import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			name: '',
			email: '',
			phoneNumber: '',
			password: '',
			passwordConfirmed: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => this.setState({
		[e.target.name]: e.target.value
	});

	onSubmit = e => {
		const { firstName, lastName, userName, name, email, phoneNumber, password, passwordConfirmed } = this.state;

		e.preventDefault();

		const newUser = {
			firstName,
			lastName,
			userName,
			name,
			email,
			phoneNumber,
			password,
			passwordConfirmed
		}

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const { firstName, lastName, userName, name, email, phoneNumber, password, passwordConfirmed, errors } = this.state;

		return (
			<div>
				<div className="flex items-center text-left max-w-sm mx-auto">
					<form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit}>
						<TextFieldGroup
							placeholder="First Name"
							label="First Name"
							name="firstName"
							type="text"
							value={firstName}
							onChange={this.onChange}
							error={errors.firstName}
						/>
						<TextFieldGroup
							placeholder="Last Name"
							label="Last Name"
							name="lastName"
							type="text"
							value={lastName}
							onChange={this.onChange}
							error={errors.lastName}
						/>
						<TextFieldGroup
							placeholder="Email"
							label="Email"
							name="email"
							type="email"
							value={email}
							onChange={this.onChange}
							error={errors.email}
						/>
						<TextFieldGroup
							placeholder="Password"
							label="Password"
							name="password"
							type="password"
							value={password}
							onChange={this.onChange}
							error={errors.password}
						/>
						<TextFieldGroup
							placeholder="Confirm Password"
							label="Confirm Password"
							name="passwordConfirmed"
							type="password"
							value={passwordConfirmed}
							onChange={this.onChange}
							error={errors.passwordConfirmed}
						/>
						<div className="flex items-center justify-end mt-8 text-sm text-grey-darker">
							Already have an account?
							<Link to="/" className="inline-block align-baseline font-medium text-sm text-indigo ml-2">
								Login
							</Link>
						</div>
						<div className="flex items-center justify-between mt-8">
							<button
								className="bg-indigo-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight h-12 m-0 px-4 py-2 cursor-pointer focus:outline-none w-full"
								type="submit"
								>
								Create Account <span className="ml-1">→</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
