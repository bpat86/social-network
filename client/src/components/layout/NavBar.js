import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class NavBar extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	}
	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<div className="hidden md:flex w-full leading-12">
				<div className="navigation flex w-full justify-end items-center">
					<a
						href=""
						onClick={this.onLogoutClick}
						className="navigation-item flex items-center h-12 leading-12 px-4"
						>
						<img
							className="w-10 h-10 rounded-full mr-4"
							src={user.avatar}
							alt={user.name}
							title="You must have a gravatar connected to your email to display an image"
						/>
						Logout
					</a>
				</div>
			</div>
		);
		const guestLinks = (
			<div className="hidden md:flex w-full leading-12">
				<div className="navigation flex w-full justify-end items-center">
					<Link to="/register" className="navigation-item inline-flex h-12 leading-12 px-4">Sign Up</Link>
					<Link to="/login" className="navigation-item inline-flex h-12 leading-12 px-4 pr-0">Login</Link>
				</div>
			</div>
		);

		return (
			<nav className="z-10">
				<div className="flex bg-grey-lightest fixed pin-t pin-x z-100 h-12 items-center">
					<div className="w-full max-w-screen-xl relative mx-auto px-4">
						<div className="flex items-center">
							<Link to="/" className="flex items-center w-full md:w-1/2">
								Social Network
							</Link>
							{ isAuthenticated ? authLinks : guestLinks }
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

NavBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
