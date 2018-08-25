import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	onChange = e => this.setState({
		[e.target.name]: e.target.value
	});

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onSubmit = e => {
		e.preventDefault();

		const { email, password } = this.state;
		const userData = {
			email,
			password
		};

		this.props.loginUser(userData);
	}

	render() {
		const { email, password, errors } = this.state;

		return (
			<div>
				<div className="flex items-center text-left max-w-sm mx-auto">
					<form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={this.onSubmit}>
						<TextFieldGroup
							placeholder="Email Address"
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
						<div className="flex items-center justify-between mt-8">
							<label className="md:w-2/3 block text-grey-darker hover:text-black font-medium">
								<input className="mr-2 leading-tight" type="checkbox" />
								<span className="text-sm">Remember this device</span>
							</label>
						</div>
						<div className="flex items-center justify-between mt-8">
							<button
								className="bg-indigo-dark text-grey-lightest bg-transparent rounded font-medium text-center leading-tight h-12 m-0 px-4 py-2 cursor-pointer focus:outline-none w-full"
								type="submit"
								>
								Login <span className="ml-1">→</span>
							</button>
						</div>
						<div className="flex items-center justify-end mt-8">
							<Link to="/" className="inline-block align-baseline font-medium text-sm text-grey-darker hover:text-black" href="#">
							Forgot Password?
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
